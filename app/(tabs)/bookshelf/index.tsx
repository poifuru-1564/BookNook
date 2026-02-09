import BookCover from "@/components/BookCover";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function bookshelf() {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Bookshelves</Text>
        <View style={styles.linkContainer}>
          <Link href={"/(tabs)/bookshelf/wishlist"}>
            <View style={styles.linkBox}>
              <MaterialCommunityIcons name="book-heart-outline" size={28} />
              <Text style={styles.linkBoxText}>Wishlist</Text>
            </View>
          </Link>
          <Link href={"/(tabs)/bookshelf/finished"} style={styles.linkBox}>
            <View style={styles.linkBox}>
              <MaterialCommunityIcons name="book-check-outline" size={28} />
              <Text style={styles.linkBoxText}>Finished</Text>
            </View>
          </Link>
          <Link href={"/(tabs)/bookshelf/quotes"}>
            <View style={styles.linkBox}>
              <Entypo name="quote" size={28} />
              <Text style={styles.linkBoxText}>Quotes</Text>
            </View>
          </Link>
        </View>
        <View style={styles.borderLine} />
        <View style={styles.bkListContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" color={ColorPalette.muted} size={16} />
            <TextInput
              placeholder="Search for books"
              style={styles.searchBarInput}
            />
          </View>
          <View style={styles.bkList}>
            <BookCover />
            <BookCover />
            <BookCover />
            <BookCover />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bkListContainer: {
    alignItems: "center",
  },
  bkList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    gap: "5%",
    marginTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    padding: 10,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  linkBox: {
    flexDirection: "column",
    alignItems: "center",
  },
  linkBoxText: {
    marginTop: 5,
    fontSize: FontSize.text,
  },
  borderLine: {
    margin: 12,
    width: "90%",
    alignSelf: "center",
    borderTopColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
  },

  searchBar: {
    width: "80%",
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 9,
    padding: 7,
    marginTop: 5,
    flexDirection: "row",
    fontSize: 15,
  },
  searchBarInput: {
    paddingLeft: 8,
    fontSize: 12,
  },
});
