import { ColorPalette, FontSize } from "@/constants/useTheme";
import AddBook from "@/features/bookshelf/AddBook";
import { handleGetBookshelf } from "@/features/bookshelf/bookServices";
import DisplayBooks from "@/features/bookshelf/DisplayBooks";
import { auth } from "@/firebase";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddCard = () => {
  const uid = auth.currentUser?.uid;

  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [isFiltered, setisFiltered] = useState(false);

  // filter books (low priority)
  const fetchByTitle = async () => {
    if (uid === undefined) return;
    try {
      const docs = handleGetBookshelf(uid, "wishlish", "finished");
    } catch (error) {}
  };

  const startReading = async () => {
    if (!uid) return;
    try {
      // await handleChangeStatus(uid, did, "progress")
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Close?", "Draft will not be saved.", [
                { text: "Continue Editing", style: "cancel" },
                {
                  text: "Close",
                  style: "destructive",
                  onPress: () => setModalVisible(false),
                },
              ]);
            }}
            style={{ alignSelf: "flex-start", padding: 5 }}
          >
            <Ionicons name="close" size={20} style={styles.closeIcon} />
          </TouchableOpacity>

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

      <View style={styles.searchBar}>
        <Ionicons name="search" color={ColorPalette.muted} size={16} />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Title..?"
          placeholderTextColor={ColorPalette.muted}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      {!isFiltered && (
        <View style={styles.listContainer}>
          <DisplayBooks bookshelf="wishlist" bookshelf2="finished" />
        </View>
      )}

      {/* {isFiltered && (

      )} */}
    </SafeAreaView>
  );
};

export default AddCard;

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
