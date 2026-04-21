import { ColorPalette, FontSize } from "@/constants/constantValues";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  url: string;
  altTitle?: string;
};

const CoverImage = ({ url, altTitle }: Props) => {
  if (url === "N/A") {
    return (
      <View
        style={{
          borderWidth: 0.5,
          borderColor: ColorPalette.muted,
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../img/unavailable.png")}
          resizeMode="contain"
          style={{
            width: "50%",
            height: "50%",
          }}
        />
        <Text
          style={{
            fontSize: FontSize.small,
            color: ColorPalette.grey,
          }}
        >
          {altTitle}
        </Text>
      </View>
    );
  } else {
    return (
      <Image
        source={{ uri: url }}
        resizeMode="contain"
        style={{ width: "100%", height: "100%", marginRight: 10 }}
      />
    );
  }
};

export default CoverImage;
