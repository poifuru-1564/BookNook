import { userBook } from "@/constants/interface";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  handleEditPageCount,
  handleGetBookshelf,
} from "../bookshelf/bookServices";
import { handleStartBook } from "../home/cardServices";

const useDisplayBooks = (
  uid: string | undefined,
  bookshelf: string,
  bookshelf2: string | undefined,
) => {
  const [list, setList] = useState<userBook[]>([]); // list of books
  const [book, setBook] = useState<userBook>(); // selected book
  const [pageCount, setPageCount] = useState<number | string>("");
  const [newPageCount, setNewPageCount] = useState("");

  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // refreshing flatlist

  const [isModalVisible, setisModalVisible] = useState(false); // when selected
  const [isReviewModalVisible, setReviewModalVisible] = useState(false); // for finished books

  const getBookList = async () => {
    if (!uid) return;

    try {
      const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
        bookshelf2 === undefined
          ? await handleGetBookshelf(uid, bookshelf)
          : await handleGetBookshelf(uid, bookshelf, bookshelf2);

      let bklist: userBook[] = [];

      querySnapshot.forEach((doc) => {
        bklist.push({
          docId: doc.id,
          status: doc.data().status,
          imageLink: doc.data().imageLink,
          manual: doc.data().manual,
          title: doc.data().title,
          pageCount: doc.data().pageCount,
          review: doc.data().review,
          rating: doc.data().rating,
          lastRead: doc.data().lastRead,
        });
      });

      setList(bklist);
    } catch (error) {
      console.log("getBookList(): Error displaying Book covers" + error);
      setLoading(false);
      setFailed(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBookList();
  }, []);

  const bookSelected = (item: userBook) => {
    if (item === undefined) return;
    setBook(item);
    item.pageCount
      ? setNewPageCount(String(item.pageCount))
      : setNewPageCount("");
    setisModalVisible(true);
  };

  const firstRead = async (bk: userBook | undefined) => {
    if (!uid || bk === undefined) return;

    if (newPageCount.trim().length === 0) {
      Alert.alert(
        "Missing Input",
        `Please enter the total number of pages in ${bk.title}`,
      );
      return;
    }

    const newPage = parseInt(newPageCount);

    if (pageCount !== newPage) {
      await handleEditPageCount(uid, bk.docId, newPage);
    }

    await startBook(bk);
  };

  const startBook = async (bk: userBook) => {
    if (!uid) return;
    try {
      await handleStartBook(uid, bk.docId);
      setisModalVisible(false);
    } catch (error) {
      console.log("onStartPressed: " + error);
    }
  };

  const seeReview = () => {
    setisModalVisible(false);
    setReviewModalVisible(true);
  };

  const refresh = async () => {
    setRefreshing(true);
    setLoading(true);
    await getBookList();
    setLoading(false);
    setRefreshing(false);
  };

  return {
    book,
    list,
    loading,
    failed,
    isModalVisible,
    setisModalVisible,
    isReviewModalVisible,
    setReviewModalVisible,
    newPageCount,
    setNewPageCount,
    refreshing,
    bookSelected,
    firstRead,
    startBook,
    seeReview,
    refresh,
  };
};

export default useDisplayBooks;
