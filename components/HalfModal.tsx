import React, { PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
}>;

export default function OpenHalfModal({ isVisible, children }: Props) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.halfModalContainer}>{children}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  halfModalContainer: {
    backgroundColor: "#ffffff9c",
    height: "100%",
  },
});
