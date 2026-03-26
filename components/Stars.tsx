import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const Stars = () => {
  return (
    <View style={{ flexDirection: "row", gap: 3 }}>
      <Ionicons name="star-outline" size={25} />
      <Ionicons name="star-outline" size={25} />
      <Ionicons name="star-outline" size={25} />
      <Ionicons name="star-outline" size={25} />
      <Ionicons name="star-outline" size={25} />
    </View>
  );
};

export default Stars;
