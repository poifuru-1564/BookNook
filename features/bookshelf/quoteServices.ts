import { quote } from "@/constants/interface";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@react-native-firebase/firestore";
import { db } from "../../firebase";

export const handleAddQuote = async (
  uid: string,
  quote: string,
  title: string,
  author: string,
  pageNum: string,
  lineNum: string,
) => {
  const ref = collection(db, "quotes");
  const docRef = await addDoc(ref, {
    userID: uid,
    quote: quote,
    title: title,
    author: author,
  });

  if (pageNum.trim() !== "") {
    updateDoc(doc(ref, docRef.id), { page: pageNum });
  }
  if (lineNum.trim() !== "") {
    updateDoc(doc(ref, docRef.id), { line: lineNum });
  }
};

export const handleDeleteQuote = async (docID: string) => {
  await deleteDoc(doc(db, "quotes", docID));
};

export const handleEditQuotes = async (
  docID: string,
  items: Partial<quote>,
) => {
  await updateDoc(doc(db, "quotes", docID), items);
};

export const handleGetQuotes = async (uid: string) => {
  const q = query(collection(db, "quotes"), where("userID", "==", uid));

  return await getDocs(q);
};

export const handleFilterByAuthor = async (
  uid: string,
  searchString: string,
) => {
  try {
    const q = query(
      collection(db, "quotes"),
      where("userID", "==", uid),
      where("author", "==", searchString),
    );

    return await getDocs(q);
  } catch (error: any) {
    console.log("handleFilterByAuthor: " + error);
    throw new Error(error.message);
  }
};

export const handleFilterByTitle = async (
  uid: string,
  searchString: string,
) => {
  try {
    const q = query(
      collection(db, "quotes"),
      where("userID", "==", uid),
      where("title", "==", searchString),
    );

    return await getDocs(q);
  } catch (error: any) {
    console.log("handleFilterByTitle: " + error);
    throw new Error(error.message);
  }
};
