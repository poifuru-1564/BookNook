import { auth } from "@/firebase";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { quote } from "../components/DisplayQuotes";
import {
  handleFilterByAuthor,
  handleFilterByTitle,
  handleGetQuotes,
} from "../quoteServices";

const useDisplayQuotes = () => {
  const uid = auth.currentUser?.uid;
  const [quotes, setQuotes] = useState<quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editItem, setEditItem] = useState<quote>();
  const [filterType, setFilterType] = useState<"author" | "title" | null>(null);
  const [filterText, setFilterText] = useState("");

  const quotesList = async () => {
    if (uid === undefined) return;
    try {
      const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
        await handleGetQuotes(uid);
      let qlist: quote[] = [];
      querySnapshot.forEach((doc) => {
        let l = "";
        let p = "";

        if (doc.data().page !== undefined) {
          p = "P" + doc.data().page;
        }
        if (doc.data().line !== undefined) {
          l = "L" + doc.data().line;
        }

        qlist.push({
          docID: doc.id,
          quote: doc.data().quote,
          title: doc.data().title,
          author: doc.data().author,
          page: p,
          line: l,
        });
      });
      setQuotes(qlist);
    } catch (error) {
      console.log("Error displaying quotes " + error);
      setFailed(true);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    quotesList();
  }, []);

  const filter = async () => {
    if (filterType === null) {
      Alert.alert(
        "Empty Checkbox",
        "Check either filtering by a book title or author.",
      );
      return;
    }
    if (filterText.trim().length === 0) {
      Alert.alert(
        "Missing Input",
        "Enter book title or author in the search bar.",
      );
      return;
    }

    try {
      setLoading(true);
      if (uid === undefined) return;
      let querySnapshot: FirebaseFirestoreTypes.QuerySnapshot;
      if (filterType === "author") {
        querySnapshot = await handleFilterByAuthor(uid, filterText.trim());
      } else {
        querySnapshot = await handleFilterByTitle(uid, filterText.trim());
      }

      if (querySnapshot.empty) {
        alert("Match Not Found");
        setLoading(false);
        return;
      }
      let qlist: quote[] = [];
      querySnapshot.forEach((doc) => {
        let l = "";
        let p = "";

        if (doc.data().page !== undefined) {
          p = "P" + doc.data().page;
        }
        if (doc.data().line !== undefined) {
          l = "L" + doc.data().line;
        }

        qlist.push({
          docID: doc.id,
          quote: doc.data().quote,
          title: doc.data().title,
          author: doc.data().author,
          page: p,
          line: l,
        });
      });

      setQuotes(qlist);
      setLoading(false);
    } catch (error) {
      console.log("filter: " + error);
      Alert.alert("", "Search Failed. Please try again.");
    }
  };

  // On edit pressed
  const onEditPressed = (item: quote) => {
    setEditItem(item);
    setEditVisible(true);
  };

  const refresh = async () => {
    setRefreshing(true);
    setLoading(true);
    await quotesList();
    setLoading(false);
    setRefreshing(false);
  };

  return {
    refresh,
    filter,
    onEditPressed,
    quotes,
    loading,
    refreshing,
    failed,
    isEditVisible,
    setEditVisible,
    editItem,
    filterType,
    setFilterType,
    filterText,
    setFilterText,
  };
};

export default useDisplayQuotes;
