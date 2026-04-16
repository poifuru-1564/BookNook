import Header from "@/components/Header";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleSignOut } from "../services";
import styles from "../styles";

const SettingsScreen = () => {
  const signout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      Alert.alert(
        "Logout Failed",
        "Error occurred logging out. Please try again.",
      );
      console.log("signout: " + error);
    }
  };

  return (
    <SafeAreaView>
      <Header label="Settings" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Logout?",
              "Are you sure you to logout of your account? ",
              [
                {
                  text: "Logout",
                  onPress: () => signout(),
                  style: "destructive",
                },
                { text: "Cancel", style: "cancel" },
              ],
            )
          }
          style={styles.redBtnContainer}
        >
          <Text style={styles.redBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
