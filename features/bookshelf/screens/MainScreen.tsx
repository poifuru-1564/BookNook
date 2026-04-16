import HeaderWithIcon from "@/components/HeaderWithIcon";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import { ColorPalette, FontSize } from "@/constants/constantValues";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import DisplayBooks from "../../shared/DisplayBooks";
import AddBook from "../components/AddBook";

const MainScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ModalCloseBtn setModalVisible={setModalVisible} withAlert={false} />

          <AddBook setAddBookVisible={setModalVisible} />
        </View>
      </Modal>

      <HeaderWithIcon
        label="Bookshelves"
        action={() => setModalVisible(true)}
        iconName="add"
      />

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
    </View>
  );
};

export default MainScreen;

export const styles = StyleSheet.create({
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
