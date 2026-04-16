import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { quote } from "../components/DisplayQuotes";
import {
  handleAddQuote,
  handleDeleteQuote,
  handleEditQuotes,
} from "../quoteServices";

const useAddQuotes = (
  list: quote | undefined,
  setEditVisible: (isVisible: boolean) => void,
) => {
  let iniQ: string = "",
    iniT: string = "",
    iniA: string = "",
    iniP: string = "",
    iniL: string = "",
    isEdit: boolean = false;

  useEffect(() => {
    if (list !== undefined) {
      isEdit = true;
      iniQ = list.quote;
      iniT = list.title;
      iniA = list.author;
      iniP = list.page;
      iniL = list.line;
    }
  }, []);

  const [quote, setQuote] = useState(iniQ);
  const [title, setTitle] = useState(iniT);
  const [author, setAuthor] = useState(iniA);
  const [page, setPage] = useState(iniP);
  const [line, setLine] = useState(iniL);

  const uid = auth.currentUser?.uid;

  const onAddPressed = async () => {
    // check input fields
    let message = "";

    if (quote.trim() === "") {
      message += "Quote\n";
    }
    if (title.trim() === "") {
      message += "Title\n";
    }
    if (author.trim() === "") {
      message += "Author\n";
    }

    if (message.length !== 0) {
      Alert.alert("Missing Fields ↓", message, [
        { text: "Ok", style: "destructive" },
      ]);
      return;
    }
    // add
    isEdit ? editQuote() : addQuote();
  };

  // update the field that changed or update by giving all params to the update function

  const addQuote = async () => {
    try {
      if (uid === undefined) return;
      await handleAddQuote(uid, quote, title, author, page, line);
      setEditVisible(false);
      Alert.alert("", "Quote added successfully");
    } catch (error) {
      Alert.alert("", "Failed to add quote");
      console.log("addQuote: " + error);
    }
  };

  const editQuote = async () => {
    const fields: Partial<quote> = {};
    if (quote !== iniQ) {
      fields.quote = quote;
    }
    if (title !== iniT) {
      fields.title = title;
    }
    if (author !== iniA) {
      fields.author = author;
    }
    if (page !== iniP) {
      fields.page = page;
    }
    if (line !== iniL) {
      fields.line = line;
    }
    console.log(fields);

    if (Object.keys(fields).length === 0) {
      Alert.alert("", "No changes made. Do you want to continue editing?", [
        { text: "No", onPress: () => setEditVisible(false) },
        { text: "Yes", style: "cancel" },
      ]);
    } else {
      try {
        if (list?.docID === undefined) return;
        await handleEditQuotes(list?.docID, fields);
        Alert.alert("", "Updated Successfully!");
        setEditVisible(false);
      } catch (error) {
        console.log("updateQuote" + error);
        Alert.alert("", "Failed to update quote");
      }
    }
  };

  const onDeletePressed = () => {
    Alert.alert("Delete Quote", "Are you sure you want to delete this quote?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            if (list?.docID === undefined) return;
            await handleDeleteQuote(list?.docID);
            Alert.alert("", "Quote Deleted");
            setEditVisible(false);
          } catch (error) {
            console.log(error);
            alert("Failed to delete quote");
          }
        },
      },
    ]);
  };

  return {
    quote,
    title,
    author,
    page,
    line,
    isEdit,
    setQuote,
    setTitle,
    setAuthor,
    setPage,
    setLine,
    onAddPressed,
    onDeletePressed,
  };
};

export default useAddQuotes;
