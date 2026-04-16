import { ColorPalette, FontSize } from "@/constants/constantValues";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onPressAction: () => void | Promise<void>;
  label: string;
};

const MyButton = ({ onPressAction, label }: Props) => {
  return (
    <View style={btnStyles.btnOuterContainer}>
      <TouchableOpacity
        style={btnStyles.btnInnerContainer}
        onPress={onPressAction}
      >
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={{ fontSize: FontSize.sub, fontWeight: "500" }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;

export const btnStyles = StyleSheet.create({
  btnInnerContainer: {
    marginTop: 12,
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  btnOuterContainer: {
    width: "80%",
    alignSelf: "center",
  },
});
