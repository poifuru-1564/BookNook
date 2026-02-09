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
  onBorrowed: () => void;
};

const ReturnBook = ({ onClose, onBorrowed }: Props) => {
  const onSubmit = () => {
    onClose();
    onBorrowed();
  };
  return (
    <View style={styles.returnContainer}>
      <View style={styles.returnContent}>
        <TouchableOpacity>
          <Ionicons
            name="close"
            size={20}
            style={styles.closeIcon}
            onPress={onClose}
          />
        </TouchableOpacity>
        <View style={styles.returnTextContainer}>
          <Text>ReturnBook</Text>
          <TextInput
            style={styles.pageInput}
            placeholder="Page #"
            keyboardType="numeric"
          />

          <Text>You read ## pages today.</Text>
          <Text>Keep up the progress!</Text>

          <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
            <Text style={{ fontSize: 12 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReturnBook;

const styles = StyleSheet.create({
  returnContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  returnContent: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    height: "50%",
    width: "80%",
    backgroundColor: ColorPalette.card,
    color: ColorPalette.text,
    borderRadius: 10,
    shadowColor: "#4c4c3b",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: { width: 1, height: 4 },
  },
  closeIcon: {
    paddingLeft: 8,
    paddingTop: 8,
  },
  pageInput: {
    borderColor: ColorPalette.text,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    fontSize: 15,
    borderRadius: 5,
    width: 80,
    marginTop: 15,
    marginBottom: 15,
  },
  returnTextContainer: {
    alignItems: "center",
  },
  submitBtn: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.text,
    padding: 7,
    paddingRight: 12,
    paddingLeft: 9,
    borderRadius: 5,
  },
});
