import React from "react";
import BookCover from "./BookCover";
import Link from "next/link";
import { cn } from "@/lib/utils";
const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => (
  <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={"/books/${id}"}
      className={cn(isLoanedBook && "w-full flex felx-col items-center")}
    >
      <BookCover coverColor={coverColor} coverImage={coverUrl} />

      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>
    </Link>
  </li>
);

export default BookCard;
