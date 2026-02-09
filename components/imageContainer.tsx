import { ImageBackground } from "expo-image";
import React from "react";

import { View } from "react-native";

type imageUrl = {
  url: string;
};

const imageContainer = (props: imageUrl) => {
  return (
    <View>
      <ImageBackground source={props.url}></ImageBackground>
    </View>
  );
};

export default imageContainer;
