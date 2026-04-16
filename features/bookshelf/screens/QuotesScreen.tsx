import HeaderWithIcon from "@/components/HeaderWithIcon";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import { ColorPalette } from "@/constants/constantValues";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardEventListener,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import AddQuotes from "../components/AddQuotes";
import DisplayQuotes from "../components/DisplayQuotes";

const QuotesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navbarHeight = useBottomTabBarHeight();

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
    <View style={{ flex: 1 }}>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ModalCloseBtn setModalVisible={setModalVisible} withAlert={true} />

          <AddQuotes
            setEditVisible={setModalVisible}
            keyboardHeight={keyboardHeight}
            isKeyboardVisible={isKeyboardVisible}
          />
        </View>
      </Modal>

      <View style={{ flex: 1 }}>
        <HeaderWithIcon
          label="Quotes"
          action={() => setModalVisible(true)}
          iconName="add"
        />
        <DisplayQuotes
          keyboardHeight={keyboardHeight}
          isKeyboardVisible={isKeyboardVisible}
        />
      </View>
    </View>
  );
};

export default QuotesScreen;

const styles = StyleSheet.create({
  closeIcon: { paddingLeft: 10 },

  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
});
