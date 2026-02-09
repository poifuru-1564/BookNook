import { ColorPalette } from "@/constants/useTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BookCover = () => {
  return (
    <View style={styles.bkContainer}>
      <Text>Book Image</Text>
    </View>
  );
};

export default BookCover;

const BookDetail = () => {
  return (
    <View style={styles.bkContainer}>
      <Text>Book Detail</Text>
    </View>
  );
};

const Flip = {};

const styles = StyleSheet.create({
  bkContainer: {
    width: "30%",
    height: 150,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: ColorPalette.card,
  },
});
