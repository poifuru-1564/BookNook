import { ColorPalette, FontSize } from "@/constants/useTheme";
import AddBook from "@/features/bookshelf/AddBook";
import DisplayBooks from "@/features/bookshelf/DisplayBooks";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function bookshelf() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ paddingBottom: 300 }}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ alignSelf: "flex-start", padding: 5 }}
          >
            <Ionicons name="close" size={20} style={styles.closeIcon} />
          </TouchableOpacity>

          <AddBook setAddBookVisible={setModalVisible} />
        </View>
      </Modal>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Bookshelves</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="plus" size={20} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>

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

      <View style={{ alignSelf: "center" }}>
        <Link
          href={"/(tabs)/bookshelf/recommendation"}
          style={{ alignSelf: "center", width: "80%" }}
        >
          <View
            style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} />
            <Text style={{ fontWeight: "500" }}>Get Book Recommendations</Text>
          </View>
        </Link>
      </View>

      <DisplayBooks bookshelf="all" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  plusIcon: {
    paddingTop: 10,
    paddingRight: 15,
  },
  closeIcon: {
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
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
    fontWeight: "600",
  },
  borderLine: {
    margin: 12,
    width: "90%",
    alignSelf: "center",
    borderTopColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
  },
});
