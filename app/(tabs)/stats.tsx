import { ColorPalette, FontSize } from "@/constants/useTheme";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
// import { appleAuth } from "@invertase/react-native-apple-authentication";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function stats() {
  const handleSignOut = async () => {
    try {
      const providerId = getAuth().currentUser?.providerId;
      if (providerId === "google.com") {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      // else {
      //   const response = await appleAuth.performRequest({
      //     requestedOperation: appleAuth.Operation.LOGOUT,
      //   });
      // }

      // logout from firebase
      await signOut(getAuth());
      alert("Successfully signed out. See you next time!");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.container}>
          <View style={styles.calendarContainer}>
            <Text>*Calendar*</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Stats</Text>
            <View style={styles.stats}>
              <FontAwesome6 name="book" size={25} style={styles.statsIcon} />
              <View style={styles.statsTextContainer}>
                <Text style={styles.statsText}>## books</Text>
                <Text style={styles.statsSubtext}>Total Finished Books</Text>
              </View>
            </View>

            <View style={styles.stats}>
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

            <View style={styles.stats}>
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

          <TouchableOpacity
            style={styles.signOutContainer}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signOutContainer}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>Delete Account</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: ColorPalette.muted,
    paddingTop: 10,
    paddingBottom: 20,
  },
  statsTitle: {
    fontSize: FontSize.large,
    fontWeight: "600",
  },
  stats: {
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
  signOutContainer: {
    width: "80%",
    marginTop: 20,
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  signOutText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: ColorPalette.warning,
  },
});
