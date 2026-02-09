import { ColorPalette } from "@/constants/useTheme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const finished = () => {
  return (
    <ScrollView>
      <View style={styles.bkListContainer}>
        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <Text>Rating Here</Text>
          <TouchableOpacity>
            <Text>Click here to see your review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <Text>Rating Here</Text>
          <TouchableOpacity>
            <Text>Click here to see your review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <Text>Rating Here</Text>
          <TouchableOpacity>
            <Text>Click here to see your review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <Text>Rating Here</Text>
          <TouchableOpacity>
            <Text>Click here to see your review</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <Text>Rating Here</Text>
          <TouchableOpacity>
            <Text>Click here to see your review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default finished;

const styles = StyleSheet.create({
  bkListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    gap: "5%",
    marginTop: 20,
  },
  bkContainer: {
    width: "30%",
    height: 150,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: ColorPalette.card,
  },
});
