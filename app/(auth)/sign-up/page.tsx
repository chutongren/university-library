"use client";
import AuthForm from "@/components/AuthForm";
import React from "react";
import { signUpSchema } from "@/lib/validations";
// import { signInWithCredentials } from "@/lib/actions/auth";
const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={() => {}}
  />
);

export default page;
