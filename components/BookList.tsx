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
    <section className="mt-8">
      {" "}
      {/* 增加上边距 */}
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list mt-4">
        {" "}
        {/* 增加上边距 */}
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
    // <section>
    //   <h2 className="font-bebas-neue text-4xl text-light-100">Latest Books</h2>
    //   <ul className="book-list">
    //     {books.map((book) => (
    //       <BookCard key={book.title} {...book} />
    //     ))}
    //   </ul>
    // </section>
  );
};

export default Booklist;
