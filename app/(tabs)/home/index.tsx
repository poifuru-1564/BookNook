import HeaderWithIcon from "@/components/HeaderWithIcon";
import Card from "@/features/home/components/Card";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <HeaderWithIcon
        label="Current Reads"
        action={() => router.navigate("/(tabs)/home/startBook")}
        iconName="add"
      />
      <Card />
    </SafeAreaView>
  );
}
