import AddCard from "@/components/AddCard";
import Card from "@/components/Card";
import OpenModal from "@/components/Modal";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import { BookPlus } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const [isModalVisible, setModalVisible] = useState(false);
  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView>
        <View>
          <OpenModal isVisible={isModalVisible} onClose={onClose}>
            <AddCard onClose={onClose} />
          </OpenModal>
        </View>

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.homeTitle}>Current Reads</Text>
            <TouchableOpacity style={styles.plusIcon}>
              <BookPlus size={25} onPress={() => setModalVisible(true)} />
            </TouchableOpacity>
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
    opacity: 0.5,
    paddingRight: 15,
  },
});
