import HeaderWithIcon from "@/components/HeaderWithIcon";
import Loading from "@/components/Loading";
import { ColorPalette } from "@/constants/constantValues";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Goals from "../components/Goals";
import Stats from "../components/Stats";
import Streaks from "../components/Streaks";
import styles from "../styles";
import useProfile from "../useProfile";

const ProfileScreen = () => {
  const {
    total,
    progress,
    pages,
    streakDays,
    records,
    yearCurrent,
    yearGoal,
    loading,
    refresh,
  } = useProfile();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: ColorPalette.background, flex: 1 }}>
      <View>
        <HeaderWithIcon
          label="Profile"
          action={() => router.navigate("/profile/settings")}
          iconName="settings-outline"
        />

        <View style={styles.container}>
          <View style={styles.streakContainer}>
            <Streaks weekRecords={records} />
          </View>

          <View style={styles.statsContainer}>
            <Stats
              total={total}
              progress={progress}
              pages={pages}
              streak={streakDays}
            />
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Goals yearlyGoal={yearGoal} yearCurrent={yearCurrent} />
        </View>
      </View>

      <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
        <EvilIcons
          onPress={() => refresh()}
          name="refresh"
          size={28}
          color="black"
          style={styles.refreshIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
