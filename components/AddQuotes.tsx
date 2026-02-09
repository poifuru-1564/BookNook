import { ColorPalette, FontSize } from "@/constants/useTheme";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddQuotes = () => {
  return (
    <View>
      <View style={styles.addQuoteContainer}>
        <TextInput
          style={styles.quoteInput}
          placeholder="Quote..."
          multiline={true}
          numberOfLines={5}
        />
        <TextInput style={styles.input} placeholder="Book Title" />
        {/* auto input */}
        <TextInput style={styles.input} placeholder="Author" />
        <View style={styles.quotePageInputContainer}>
          <TextInput
            style={styles.quotePageInput}
            placeholder="Page"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.quotePageInput}
            placeholder="Line (optional)"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Text>
            <Entypo name="plus" />
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddQuotes;

const styles = StyleSheet.create({
  addQuoteContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  quoteInput: {
    height: 100,
    width: "80%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },
  input: {
    width: "80%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },
  quotePageInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  quotePageInput: {
    width: "48%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },
  addBtn: {
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    paddingRight: 12,
    paddingLeft: 9,
    borderRadius: 5,
  },
});
