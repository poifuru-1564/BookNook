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
import { quotesList } from "./DisplayQuotes";

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
  items: Partial<quotesList>,
) => {
  await updateDoc(doc(db, "quotes", docID), items);
};

export const handleGetQuotes = async (uid: string) => {
  const q = query(collection(db, "quotes"), where("userID", "==", uid));

  return await getDocs(q);
};
