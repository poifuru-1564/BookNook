import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";

type Props = {
  total: number;
  progress: number;
  pages: number;
  streak: number;
};

export const Stats = ({ total, progress, pages, streak }: Props) => {
  return (
    <View>
      <Text style={styles.subTitle}>Stats</Text>

      <View style={{ paddingLeft: 20 }}>
        <View style={styles.statsRow}>
          <View style={styles.stats}>
            <FontAwesome6
              name="bolt-lightning"
              size={25}
              style={styles.statsIcon}
            />
            <View>
              <Text style={styles.statsText}>{streak}</Text>

              <Text style={styles.statsSubtext}>Reading Streak</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <FontAwesome6
              name="book-open-reader"
              size={25}
              style={styles.statsIcon}
            />
            <View>
              {progress <= 1 && (
                <Text style={styles.statsText}>{progress} book</Text>
              )}
              {progress > 1 && (
                <Text style={styles.statsText}>{progress} books</Text>
              )}
              <Text style={styles.statsSubtext}>In Progress</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stats}>
            <FontAwesome6 name="book" size={25} style={styles.statsIcon} />
            <View>
              {total <= 1 && <Text style={styles.statsText}>{total} book</Text>}
              {total > 1 && <Text style={styles.statsText}>{total} books</Text>}

              <Text style={styles.statsSubtext}>Total Finished Books</Text>
            </View>
          </View>
          <View style={styles.stats}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={25}
              style={styles.statsIcon}
            />
            <View>
              <Text style={styles.statsText}>{pages} pages</Text>
              <Text style={styles.statsSubtext}>Total Pages Read</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stats;
