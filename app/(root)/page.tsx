import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  // const result = await db.select().from(users);
  // console.log(JSON.stringify(result, null, 2));
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  return (
    <>
      {/* <BookOverview {...sampleBooks[0]} /> */}
      {/* {latestBooks.length > 0 && (
        <BookOverview
          {...latestBooks[0]}
          userId={session?.user?.id as string}
        />
      )} */}

      <BookOverview {...latestBooks[0]} userId={session?.user.id as string} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Home;
