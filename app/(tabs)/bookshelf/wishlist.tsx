import Header from "@/components/Header";
import DisplayBooks from "@/features/shared/DisplayBooks";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const wishlist = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label="Wishlist" />
      <DisplayBooks bookshelf="wishlist" />
    </SafeAreaView>
  );
};

export default wishlist;
