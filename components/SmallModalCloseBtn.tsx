import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  setModalVisible: (isVisible: boolean) => void;
};

const SmallModalCloseBtn = ({ setModalVisible }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={{ alignSelf: "flex-end" }}
    >
      <Ionicons name="close" size={18} />
    </TouchableOpacity>
  );
};

export default SmallModalCloseBtn;
