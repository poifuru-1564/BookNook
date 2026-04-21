import KeyboardHideBtn from "@/components/KeyboardHideBtn";
import MyButton from "@/components/MyButton";
import { ColorPalette } from "@/constants/constantValues";
import { quote } from "@/constants/interface";
import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "../formStyle";
import useAddQuotes from "../hooks/useAddQuotes";

type Props = {
  list?: quote;
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
  const {
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
  } = useAddQuotes(list, setEditVisible);

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

        <MyButton onPressAction={() => onAddPressed()} label="Save" />

        {isEdit && (
          <MyButton onPressAction={() => onDeletePressed()} label="Delete" />
        )}
      </View>
      {isKeyboardVisible && <KeyboardHideBtn keyboardHeight={keyboardHeight} />}
    </View>
  );
};

export default AddQuotes;
