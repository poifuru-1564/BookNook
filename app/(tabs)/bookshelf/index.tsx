import MainScreen from "@/features/bookshelf/screens/MainScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function bookshelf() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <MainScreen />
    </SafeAreaView>
  );
}
