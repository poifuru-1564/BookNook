import { ColorPalette, FontSize } from "@/constants/useTheme";
import AddQuotes from "@/features/bookshelf/AddQuotes";
import DisplayQuotes from "@/features/bookshelf/DisplayQuotes";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardEventListener,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const quotes = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="+" />
      ),
    });
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow,
    );

    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow: KeyboardEventListener = (event) => {
    setKeyboardHeight(event.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const handleKeyboardHide: KeyboardEventListener = (event) => {
    setKeyboardVisible(false);
  };

  return (
    <SafeAreaView>
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

          <AddQuotes
            setEditVisible={setModalVisible}
            keyboardHeight={keyboardHeight}
            isKeyboardVisible={isKeyboardVisible}
          />
        </View>
      </Modal>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Quotes</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo name="plus" size={20} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.quotesListContainer}>
        <DisplayQuotes
          keyboardHeight={keyboardHeight}
          isKeyboardVisible={isKeyboardVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default quotes;

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
  closeIcon: { paddingLeft: 10 },

  quotesListContainer: {
    marginTop: 10,
    height: "100%",
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
});
