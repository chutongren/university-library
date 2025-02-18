//登录验证的逻辑，1）email和password不为空 2）email是否真的在db中存在 3）password是否真的是db中之前注册时候存储的
import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    //配置会话管理策略
    strategy: "jwt", //JSON Web Token 为啥不用“database”
  },
  providers: [
    //
    CredentialsProvider({
      async authorize(credentials) {
        //authorize也没有引入，为什么可以直接用？credentials又是啥？也不是需要传入的参数啊，
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db //先去拿来 然后再来对比
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );

        if (!isPasswordValid) return null;

        return {
          //这里return的用户信息会被 NextAuth.js 接收并用于生成 JWT。
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token; //这里return了！用户id和name添加在JWT中
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session; //这里return了！用户id和name添加在
    },
  },
});

// await在哪里？
