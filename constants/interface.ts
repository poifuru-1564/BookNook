export interface userBook {
  docId: string;
  status: string;
  imageLink: string;

  title?: string;
  author?: string;
  currentPage?: number;
  rating?: number;
  review?: string;
  startedAt?: string;
  manual?: boolean;
  pageCount?: number;
  lastRead?: string;
}

export interface googleBook {
  volumeInfo: {
    title?: string;
    authors?: string;
    industryIdentifiers?: {
      type: string;
      identifier?: string;
    }[];
    pageCount?: number;
    imageLinks?: {
      smallThumbnail: string;
    };
  };
}

export interface googleBookList {
  items: googleBook[];
  totalItems: number;
}

export interface Book {
  isbn: string;
  title: string;
  author: string;
  pageCount: number;
  imageLink: string;
}
