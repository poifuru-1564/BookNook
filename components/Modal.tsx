import { ColorPalette } from "@/constants/useTheme";
import React, { PropsWithChildren } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function OpenModal({ isVisible, children, onClose }: Props) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        allowSwipeDismissal={true}
        onRequestClose={() => {
          Alert.alert("Close?", "Draft will not be saved.", [
            { text: "Continue", style: "cancel" },
            { text: "Close", style: "destructive", onPress: onClose },
          ]);
        }}
      >
        <View style={styles.modalContainer}>{children}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 65,
  },
});
