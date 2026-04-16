import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Loading = () => {
  return (
    <View style={{ backgroundColor: "FBF8EC" }}>
      <ActivityIndicator style={{ marginTop: 100 }} />
      <Text
        style={{
          alignSelf: "center",
          marginVertical: 10,
          fontFamily: "Georgia",
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

export default Loading;
