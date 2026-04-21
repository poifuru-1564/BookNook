import { Book } from "@/constants/interface";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@react-native-firebase/firestore";
// add book to books collection if !exists
export const handleAddBook = async (item: Book) => {
  try {
    item.pageCount
      ? await setDoc(doc(db, "books", item.isbn), {
          title: item.title,
          author: item.author[0],
          pageCount: item.pageCount,
          imageLink: item.imageLink,
        })
      : await setDoc(doc(db, "books", item.isbn), {
          title: item.title,
          author: item.author[0],
          imageLink: item.imageLink,
        });
  } catch (error) {
    console.log("Error handleAddBook(): " + error);
  }
};

// check if a book exists in 'books' collection
// if book exists -> return book info
// if book !exists -> return false
export const handleGetBook = async (isbn: string) => {
  const ref = doc(db, "books", isbn);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap;
  } else {
    return false;
  }
};

// check if a book exists in user's bookshelf
export const handleAddToWishlist = async (
  uid: string,
  isbn: string,
  link: string,
  title: string,
) => {
  try {
    await setDoc(
      doc(db, "users", uid, "bookshelf", isbn),
      {
        status: "wishlist",
        imageLink: link,
        title: title,
      },
      { merge: true },
    );
  } catch (error) {
    console.log("Error handleAddToWishlist(): " + error);
  }
};

//
export const handleManualInput = async (
  uid: string,
  title: string,
  author: string,
  pageNum?: number,
  imageLink?: string,
) => {
  try {
    await addDoc(collection(db, "users", uid, "bookshelf"), {
      title: title,
      author: author,
      pageCount: pageNum,
      imageLink: imageLink,
      status: "wishlist",
      manual: true,
    });
  } catch (error) {
    console.log("Error handleManualInput(): " + error);
  }
};

export const handleGetBookshelf = async (
  uid: string,
  bookshelf: string,
  bookshelf2?: string,
) => {
  try {
    if (bookshelf === "all") {
      const q = query(collection(db, "users", uid, "bookshelf"));
      return await getDocs(q);
    } else if (bookshelf2 === undefined) {
      const q = query(
        collection(db, "users", uid, "bookshelf"),
        where("status", "==", bookshelf),
      );
      return await getDocs(q);
    } else {
      const q = query(
        collection(db, "users", uid, "bookshelf"),
        where("status", "in", [bookshelf, bookshelf2]),
      );
      return await getDocs(q);
    }
  } catch (error) {
    console.log("Error handleGetBookshelf(): " + error);
  }
};

export const handleChangeStatus = async (
  uid: string,
  docId: string,
  newStatus: string,
) => {
  try {
    await updateDoc(doc(db, "users", uid, "bookshelf", docId), {
      status: newStatus,
    });
  } catch (error) {
    console.log("Error handleChangeStatus(): " + error);
  }
};

// change page count if missing in google books or is incorrect
// store inside users -> bookshelf -> book
export const handleEditPageCount = async (
  uid: string,
  docId: string,
  newPageCount: number,
) => {
  try {
    await updateDoc(doc(db, "users", uid, "bookshelf", docId), {
      pageCount: newPageCount,
    });
  } catch (error) {
    console.log("handleEditPageCount: " + error);
  }
};
