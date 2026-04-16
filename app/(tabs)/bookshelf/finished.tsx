import Header from "@/components/Header";
import DisplayBooks from "@/features/shared/DisplayBooks";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const finished = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label="Finished" />

      <DisplayBooks bookshelf="finished" />
    </SafeAreaView>
  );
};

export default finished;
