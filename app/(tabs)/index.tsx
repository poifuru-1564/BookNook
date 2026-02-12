import AddCard from "@/components/AddCard";
import Card from "@/components/Card";
import OpenModal from "@/components/Modal";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const [isModalVisible, setModalVisible] = useState(false);

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView>
        <OpenModal isVisible={isModalVisible} onClose={onClose}>
          <AddCard onClose={onClose} />
        </OpenModal>

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.homeTitle}>Current Reads</Text>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.plusIcon}
            >
              <Text style={styles.plusIcon}>+</Text>
            </Pressable>
          </View>
          <Card />
          <Card />
          <Card />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.background,
  },
  titleContainer: {
    backgroundColor: ColorPalette.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeTitle: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  plusIcon: {
    paddingRight: 10,
    fontSize: FontSize.title,
  },
});
