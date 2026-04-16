import { FontSize } from "@/constants/constantValues";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  action: () => void;
  iconName: "add" | "settings-outline";
};

const HeaderWithIcon = ({ label, action, iconName }: Props) => {
  return (
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
      <TouchableOpacity onPress={action}>
        <Ionicons
          name={iconName}
          size={20}
          style={{
            paddingTop: 10,
            paddingRight: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithIcon;
