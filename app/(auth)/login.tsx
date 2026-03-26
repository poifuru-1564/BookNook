import { FontSize } from "@/constants/useTheme";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import handleGoogleSignIn from "../../features/auth/signIn";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  return (
    <View style={styles.container}>
      <View style={styles.signInContainer}>
        <Text style={styles.signInTitle}>Welcome to Book Nook</Text>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          onPress={handleGoogleSignIn}
          color={GoogleSigninButton.Color.Light}
        />

        {/* <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={handleAppleSignIn}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  signInContainer: {
    padding: 30,
    alignItems: "center",
  },
  signInTitle: {
    fontSize: FontSize.title,
    fontWeight: "600",
    marginBottom: 20,
  },
});
