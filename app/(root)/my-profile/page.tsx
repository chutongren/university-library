import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "@/auth";
import { sampleBooks } from "@/constants";
import Booklist from "@/components/BookList";
const page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
      <Booklist title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default page;
