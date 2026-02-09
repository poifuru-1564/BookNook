import { ColorPalette } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type Props = {
  onClose: () => void;
};

const AddCard = ({ onClose }: Props) => {
  return (
    <View style={styles.addCardContainer}>
      <View>
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <Ionicons name="close" size={20} />
        </TouchableOpacity>
        <Text style={styles.addCardTitle}>Start a New Book</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" color={ColorPalette.muted} size={16} />
          <TextInput style={styles.searchBarInput} placeholder="title..?" />
        </View>
      </View>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  closeIcon: {
    paddingLeft: 10,
  },
  addCardContainer: {},
  addCardTitle: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 12,
  },
  searchBar: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 15,
    width: "60%",
    alignSelf: "center",
    padding: 8,
    flexDirection: "row",
  },
  searchBarInput: {
    paddingLeft: 5,
    fontSize: 13,
  },
});
