import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { handleGetBookshelf } from "../bookshelf/bookServices";
import { Items } from "./useCardActions";

const useCardList = (uid: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Items[]>([]);

  const onBorrowed = (index: number) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isBorrowed: !item.isBorrowed } : item,
      ),
    );
  };

  const getBookList = async () => {
    if (!uid) return;
    try {
      setLoading(true);
      const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
        await handleGetBookshelf(uid, "progress");

      let bklist: Items[] = [];

      querySnapshot.forEach((doc) => {
        bklist.push({
          book: {
            docId: doc.id,
            title: doc.data().title,
            status: doc.data().status,
            imageLink: doc.data().imageLink,
            startedAt: doc.data().startedAt,
            currentPage: doc.data().currentPage,
            pageCount: doc.data().pageCount,
            lastRead: doc.data().lastRead,
          },
          isBorrowed: false,
        });
      });
      setList(bklist);
    } catch (error) {
      console.log("Error getBookList(): " + error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  return { loading, setLoading, list, setList, getBookList, onBorrowed };
};

export default useCardList;
