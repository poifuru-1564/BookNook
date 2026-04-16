import { FontSize } from "@/constants/constantValues";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  label: string;
};

const Header = ({ label }: Props) => {
  return (
    // Scan
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: FontSize.title,
          fontWeight: "600",
          paddingTop: 10,
          paddingLeft: 20,
          paddingBottom: 10,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default Header;
