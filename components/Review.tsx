import { ColorPalette } from "@/constants/useTheme";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Review = () => {
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewTitle}>Review *Title*</Text>
      {/* star review */}

      {/* comments */}
      <TextInput
        style={styles.reviewInput}
        placeholder="Review ... "
        multiline
        numberOfLines={20}
      />
      <TouchableOpacity style={styles.addBtn}>
        <Text>
          <Entypo name="plus" />
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  reviewContainer: {
    paddingTop: 12,
    paddingRight: 22,
    paddingLeft: 22,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  reviewInput: {
    width: "100%",
    height: 150,
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 9,
    marginTop: 10,
    fontSize: 12,
  },
  addBtn: {
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    paddingRight: 12,
    paddingLeft: 9,
    borderRadius: 5,
  },
});
