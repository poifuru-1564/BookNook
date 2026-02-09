import { ColorPalette, FontSize } from "@/constants/useTheme";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// const stats = () => {
//   return (
//     <View>
//       <Text>stats</Text>
//     </View>
//   );
// };

// export default stats;

export default function stats() {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Stats</Text>
        <View style={styles.container}>
          <View style={styles.calendarContainer}>
            <Text>*Calendar*</Text>
          </View>

          <View style={styles.statsContainer}>
            <FontAwesome6 name="book" size={25} style={styles.statsIcon} />
            <View style={styles.statsTextContainer}>
              <Text style={styles.statsText}>## books</Text>
              <Text style={styles.statsSubtext}>Total Finished Books</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <FontAwesome6
              name="book-open-reader"
              size={25}
              style={styles.statsIcon}
            />
            <View style={styles.statsTextContainer}>
              <Text style={styles.statsText}>## books</Text>
              <Text style={styles.statsSubtext}>in progress</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={25}
              style={styles.statsIcon}
            />
            <View style={styles.statsTextContainer}>
              <Text style={styles.statsText}>## pages</Text>
              <Text style={styles.statsSubtext}>Total Pages Read</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.title,
    fontWeight: "600",
    padding: 10,
  },
  container: {
    alignItems: "center",
  },
  calendarContainer: {
    height: 200,
    width: "80%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: ColorPalette.muted,
    marginBottom: 20,
    marginTop: 10,
  },
  statsContainer: {
    marginTop: 10,
    width: "80%",
    borderWidth: 1,
    borderLeftWidth: 8,
    borderStyle: "solid",
    borderColor: ColorPalette.muted,
    flexDirection: "row",
    padding: 12,
  },
  statsIcon: {
    color: ColorPalette.success,
    alignSelf: "center",
    marginRight: 15,
  },

  statsTextContainer: {},
  statsText: {
    fontSize: FontSize.large,
    color: ColorPalette.text,
  },

  statsSubtext: {
    fontSize: FontSize.sub,
    color: ColorPalette.muted,
  },
});
