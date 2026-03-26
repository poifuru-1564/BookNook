import { FontSize } from "@/constants/useTheme";
import DisplayBooks from "@/features/bookshelf/DisplayBooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const finished = () => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Finished</Text>
      </View>

      <DisplayBooks bookshelf="finished" />
    </SafeAreaView>
  );
};

export default finished;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
