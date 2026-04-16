import MyButton from "@/components/MyButton";
import SmallModalCloseBtn from "@/components/SmallModalCloseBtn";
import { ColorPalette } from "@/constants/constantValues";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles";
import useGoals from "../useGoals";

type Props = {
  yearlyGoal?: number;
  yearCurrent: number;
};

const Goals = ({ yearlyGoal, yearCurrent }: Props) => {
  const {
    year,
    percentageYear,
    isFormVisible,
    setFormVisible,
    newGoal,
    setNewGoal,
    updateYearlyGoal,
  } = useGoals(yearlyGoal, yearCurrent);

  return (
    <View>
      <Text style={styles.subTitle}>Goals</Text>

      <View style={{ paddingHorizontal: 32 }}>
        <View style={s.stats}>
          <FontAwesome6
            name="calendar-check"
            size={25}
            style={styles.statsIcon}
          />
          <View>
            {yearCurrent <= 1 && (
              <Text style={styles.statsText}>{yearCurrent} book</Text>
            )}
            {yearCurrent > 1 && (
              <Text style={styles.statsText}>{yearCurrent} books</Text>
            )}
            <Text style={styles.statsSubtext}>read in {year}</Text>
          </View>
        </View>

        {yearlyGoal && (
          <View style={s.container}>
            <View style={s.goalTextContainer}>
              <Text style={s.categoryHeader}>{year}:</Text>
              <Text style={s.percentageText}>
                {yearCurrent} / {yearlyGoal}
              </Text>
            </View>

            <View style={s.barOuterContainer}>
              <View style={s.barContainer}>
                <View
                  style={{
                    backgroundColor: ColorPalette.success,
                    width: `${percentageYear}%`,
                  }}
                ></View>
                <View
                  style={{
                    backgroundColor: ColorPalette.background,
                    width: `${1 - percentageYear}%`,
                  }}
                ></View>
              </View>
            </View>

            <TouchableOpacity onPress={() => setFormVisible(true)}>
              <Text style={s.formBtnText}>Change Goal</Text>
            </TouchableOpacity>
          </View>
        )}

        {yearlyGoal === undefined && (
          <View>
            <TouchableOpacity
              style={s.formBtnContainer}
              onPress={() => setFormVisible(true)}
            >
              <Text style={s.formBtnText}>Set your goal for {year}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal visible={isFormVisible} animationType="slide" transparent>
        <View style={s.overlay}>
          <View style={s.modalContainer}>
            <View style={s.formContainer}>
              <SmallModalCloseBtn setModalVisible={setFormVisible} />
              <Text>How many books to read in {year}?</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={(text) => setNewGoal(text)}
                value={newGoal}
                style={s.inputGoal}
              />
              <MyButton
                onPressAction={() => updateYearlyGoal()}
                label="Update"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Goals;

const s = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: "100%",
  },
  categoryHeader: {
    fontWeight: "600",
    fontSize: 15,
  },
  goalTextContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  percentageText: {
    paddingLeft: 5,
    fontWeight: "600",
  },
  barOuterContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },
  barContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-start",
    height: 25,
    borderWidth: 1,
    borderColor: ColorPalette.blackOverlay,
  },
  formBtnText: {
    color: ColorPalette.success,
    textDecorationColor: ColorPalette.success,
    textDecorationLine: "underline",
    fontWeight: "500",
  },

  stats: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  formBtnContainer: {
    marginTop: 5,
    alignSelf: "flex-start",
  },

  // modal
  overlay: {
    backgroundColor: ColorPalette.blackOverlay,
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    borderRadius: 20,
    width: "75%",
    marginHorizontal: "auto",
  },

  formContainer: {
    alignItems: "center",
  },
  inputGoal: {
    borderColor: ColorPalette.muted,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    marginVertical: 5,
    width: "auto",
  },
});
