import { FontSize } from "@/constants/useTheme";
import Card from "@/features/home/components/Card";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]}>
      <View style={{ paddingBottom: 140 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.homeHeader}>Current Reads</Text>
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/home/startBook")}
          >
            <Entypo name="plus" size={20} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
        <Card />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeHeader: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  plusIcon: {
    paddingRight: 15,
  },
  closeIcon: {
    paddingLeft: 10,
  },
});
