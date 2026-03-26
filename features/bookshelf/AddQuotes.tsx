import KeyboardHideBtn from "@/components/KeyboardHideBtn";
import { ColorPalette } from "@/constants/useTheme";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";
import { quotesList } from "./DisplayQuotes";
import styles from "./formStyle";
import {
  handleAddQuote,
  handleDeleteQuote,
  handleEditQuotes,
} from "./quoteServices";

type Props = {
  list?: quotesList;
  setEditVisible: (isEditVisible: boolean) => void;
  keyboardHeight: number;
  isKeyboardVisible: boolean;
};

const AddQuotes = ({
  list,
  setEditVisible,
  keyboardHeight,
  isKeyboardVisible,
}: Props) => {
  let iniQ: string = "",
    iniT: string = "",
    iniA: string = "",
    iniP: string = "",
    iniL: string = "",
    isEdit: boolean = false;

  if (list !== undefined) {
    isEdit = true;
    iniQ = list.quote;
    iniT = list.title;
    iniA = list.author;
    iniP = list.page;
    iniL = list.line;
  }

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
    const fields: Partial<quotesList> = {};
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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.addContainer}>
        {!isEdit && <Text style={styles.addHeader}>Create New Quote</Text>}
        {isEdit && <Text style={styles.addHeader}>Edit Quote</Text>}

        <TextInput
          style={styles.quoteInput}
          placeholder="Quote..."
          placeholderTextColor={ColorPalette.muted}
          multiline={true}
          numberOfLines={5}
          value={quote}
          onChangeText={(text) => setQuote(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Book Title"
          placeholderTextColor={ColorPalette.muted}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        {/* auto input */}
        <TextInput
          style={styles.input}
          placeholder="Author"
          placeholderTextColor={ColorPalette.muted}
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
        <View style={styles.quotePageInputContainer}>
          <TextInput
            style={styles.quotePageInput}
            placeholder="Page # (optional)"
            placeholderTextColor={ColorPalette.muted}
            keyboardType="numeric"
            value={page}
            onChangeText={(text) => setPage(text)}
          />
          <TextInput
            style={styles.quotePageInput}
            placeholder="Line # (optional)"
            placeholderTextColor={ColorPalette.muted}
            keyboardType="numeric"
            value={line}
            onChangeText={(text) => setLine(text)}
          />
        </View>

        <View style={styles.btnOuterContainer}>
          <TouchableOpacity
            style={styles.btnInnerContainer}
            onPress={onAddPressed}
          >
            <View style={styles.btn}>
              <Entypo name="plus" style={styles.icon} size={16} />
              <Text>Save</Text>
            </View>
          </TouchableOpacity>

          {isEdit && (
            <TouchableOpacity
              onPress={() => onDeletePressed()}
              style={styles.btnInnerContainer}
            >
              <View style={styles.btn}>
                <AntDesign name="delete" size={15} style={styles.deleteIcon} />
                <Text style={styles.deleteText}>Delete</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isKeyboardVisible && <KeyboardHideBtn keyboardHeight={keyboardHeight} />}
    </View>
  );
};

export default AddQuotes;
