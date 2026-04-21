import { quote } from "@/constants/interface";
import { auth } from "@/firebase";
import { useState } from "react";
import { Alert } from "react-native";
import {
  handleAddQuote,
  handleDeleteQuote,
  handleEditQuotes,
} from "../quoteServices";

const useAddQuotes = (
  list: quote | undefined,
  setEditVisible: (isVisible: boolean) => void,
) => {
  const isEdit = !!list;

  const [quote, setQuote] = useState(list?.quote || "");
  const [title, setTitle] = useState(list?.title || "");
  const [author, setAuthor] = useState(list?.author || "");
  const [page, setPage] = useState(list?.page || "");
  const [line, setLine] = useState(list?.line || "");

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
    if (quote !== list?.quote) fields.quote = quote;
    if (title !== list?.title) fields.title = title;
    if (author !== list?.author) fields.author = author;
    if (page !== list?.page) fields.page = page;
    if (line !== list?.line) fields.line = line;

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
