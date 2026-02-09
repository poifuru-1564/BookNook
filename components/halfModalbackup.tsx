import { ColorPalette } from "@/constants/useTheme";
import React, { PropsWithChildren } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function OpenHalfModal({ isVisible, children, onClose }: Props) {
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
        <View style={styles.halfModalContainer}>{children}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  halfModalContainer: {
    height: "30%",
    width: "80%",
    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",
    backgroundColor: ColorPalette.surface,
    color: ColorPalette.text,
    borderColor: ColorPalette.text,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
});
