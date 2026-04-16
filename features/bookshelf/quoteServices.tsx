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
import { quote } from "./components/DisplayQuotes";

export const handleAddQuote = async (
  uid: string,
  q: string,
  t: string,
  a: string,
  p: string,
  l: string,
) => {
  const ref = collection(db, "quotes");
  const docRef = await addDoc(ref, {
    userID: uid,
    quote: q,
    title: t,
    author: a,
  });

  if (p.trim() !== "") {
    updateDoc(doc(ref, docRef.id), { page: p });
  }
  if (l.trim() !== "") {
    updateDoc(doc(ref, docRef.id), { line: l });
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
