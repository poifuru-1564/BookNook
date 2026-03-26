import { ColorPalette, FontSize } from "@/constants/useTheme";
import AddBook from "@/features/bookshelf/AddBook";
import DisplayBooks from "@/features/bookshelf/DisplayBooks";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const wishlist = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="+" />
      ),
    });
  });

  return (
    <SafeAreaView style={{ paddingBottom: 40 }}>
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

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Wishlist</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="plus" size={20} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
      <DisplayBooks bookshelf="wishlist" />
    </SafeAreaView>
  );
};

export default wishlist;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
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
});
