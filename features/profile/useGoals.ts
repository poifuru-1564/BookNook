import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { handleYearlyGoal } from "./profileServices";

const useGoals = (yearlyGoal: number | undefined, yearCurrent: number) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [percentageYear, setPercentageYear] = useState(0);

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    if (yearlyGoal !== undefined) {
      setPercentageYear((yearCurrent / yearlyGoal) * 100);
    }
  }, []);

  const updateYearlyGoal = async () => {
    const uid = auth.currentUser?.uid;
    if (uid === undefined) return;
    try {
      if (newGoal.trim().length === 0) {
        Alert.alert(
          "Missing Input",
          `Please enter the # of books you wish to read this year`,
        );
        return;
      }

      await handleYearlyGoal(uid, parseInt(newGoal));

      setFormVisible(false);
    } catch (error) {
      Alert.alert(
        "Error",
        "Error occurred updating your yearly goal. Please try again.",
      );
      console.log("updateYearlyGoal" + error);
    }
  };

  return {
    year,
    percentageYear,
    isFormVisible,
    setFormVisible,
    newGoal,
    setNewGoal,
    updateYearlyGoal,
  };
};

export default useGoals;
