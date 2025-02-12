import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const Booklist = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return;

  return (
    <section>
      <h2 className="font-bebas-neue text-4xl text-light-100">Latest Books</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default Booklist;
