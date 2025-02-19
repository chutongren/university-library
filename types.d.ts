interface Book {
  id: string; //是number不是string（github上的错误）
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt?: Date | null; //选填，不然会报错 is missing the following properties from type 'Book': createdAt, userIdts(2739)
  userId?: string;
}

// interface Book {
//   id: number; //是number不是string（github上的错误）
//   title: string;
//   author: string;
//   genre: string;
//   rating: number;
//   total_copies: number;
//   available_copies: number;
//   description: string;
//   color: string;
//   cover: string;
//   video: string;
//   summary: string;
//   createdAt?: Date | null; //选填，不然会报错 is missing the following properties from type 'Book': createdAt, userIdts(2739)
//   userId?: string;
// }

interface BookCover {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
