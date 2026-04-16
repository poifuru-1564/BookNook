import ModalCloseBtn from "@/components/ModalCloseBtn";
import { ColorPalette, FontSize } from "@/constants/constantValues";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBook from "../bookshelf/components/AddBook";
import DisplayBooks from "../shared/DisplayBooks";

export const StartBookScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ModalCloseBtn setModalVisible={setModalVisible} withAlert={false} />

          <AddBook setAddBookVisible={setModalVisible} />
        </View>
      </Modal>

      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="plus" size={20} style={styles.plusIcon} />
        </TouchableOpacity>
        <Text style={styles.addCardTitle}>Start a New Book</Text>
      </View>

      <Text style={styles.addCardSubtitle}>
        Pick your next book from your bookshelf
      </Text>

      <View style={styles.listContainer}>
        <DisplayBooks bookshelf="wishlist" bookshelf2="finished" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plusIcon: {
    paddingRight: 20,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  closeIcon: {
    paddingLeft: 10,
  },
  addCardTitle: {
    fontSize: FontSize.large,
    fontWeight: "600",
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
  listContainer: {
    paddingBottom: 140,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
});
