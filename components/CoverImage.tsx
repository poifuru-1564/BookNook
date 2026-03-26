import React from "react";
import { Image } from "react-native";

type Props = {
  url: string;
};

const CoverImage = ({ url }: Props) => {
  if (url === "N/A") {
    return (
      <Image
        source={require("../img/unavailable.png")}
        resizeMode="contain"
        style={{ width: "100%", height: "100%", marginRight: 10, padding: 10 }}
      />
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
