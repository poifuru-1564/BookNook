import QuotesScreen from "@/features/bookshelf/screens/QuotesScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function quotes() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <QuotesScreen />
    </SafeAreaView>
  );
}
