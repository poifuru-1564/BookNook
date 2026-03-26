import { ColorPalette, FontSize } from "@/constants/useTheme";
import DisplayBooks from "@/features/bookshelf/DisplayBooks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const AddCard = () => {
  return (
    <View style={styles.addCardContainer}>
      <View>
        <Text style={styles.addCardTitle}>Start a New Book</Text>
        <Text style={styles.addCardSubtitle}>
          Pick your next book from your bookshelf
        </Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" color={ColorPalette.muted} size={16} />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Title..?"
            placeholderTextColor={ColorPalette.muted}
          />
        </View>
        <DisplayBooks bookshelf="wishlist" bookshelf2="finished" />
      </View>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  closeIcon: {
    paddingLeft: 10,
  },
  addCardContainer: {},
  addCardTitle: {
    fontSize: FontSize.title,
    alignSelf: "center",
    marginBottom: 12,
  },
  addCardSubtitle: {
    color: ColorPalette.muted,
    alignSelf: "center",
    marginBottom: 12,
  },
  searchBar: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 15,
    width: "60%",
    alignSelf: "center",
    padding: 8,
    flexDirection: "row",
    marginBottom: 10,
  },
  searchBarInput: {
    paddingLeft: 5,
    fontSize: 13,
  },
});
