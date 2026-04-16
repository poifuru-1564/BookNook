import { ColorPalette } from "@/constants/constantValues";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { stat } from "../screens/ProfileScreen";
import styles from "../styles";
import useStreaks from "../useStreaks";
type Props = {
  weekRecords?: stat[];
};

const Streaks = ({ weekRecords }: Props) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const { monday, sunday, isFailed } = useStreaks(weekRecords);

  return (
    <View>
      <Text style={styles.subTitle}>
        {monday} ~ {sunday}
      </Text>

      {isFailed && (
        <View>
          <View>
            <Text style={styles.listContainer}>Failed to load data</Text>
          </View>
        </View>
      )}

      {!isFailed && (
        <View>
          <FlatList
            horizontal
            scrollEnabled={false}
            style={styles.listContainer}
            data={weekRecords}
            renderItem={({ item, index }) => (
              <View style={styles.innerContainer}>
                <Text>{days[index]}</Text>

                {!item.hasRead && (
                  <View>
                    <View style={styles.circleIcon}>
                      <Feather name="circle" size={28} />
                    </View>
                    <Text style={{ alignSelf: "center" }}>-</Text>
                  </View>
                )}

                {item.hasRead && (
                  <View>
                    <View style={styles.circleIcon}>
                      <Feather
                        name="check-circle"
                        size={28}
                        color={ColorPalette.success}
                      />
                    </View>
                    <Text style={{ alignSelf: "center" }}>
                      {item.numOfPages}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Streaks;
