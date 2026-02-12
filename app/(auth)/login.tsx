import { FontSize } from "@/constants/useTheme";
// import {
//   appleAuth,
//   AppleButton,
// } from "@invertase/react-native-apple-authentication";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      //google signin
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      if (!idToken) {
        throw new Error("Authentication Failed.");
      }

      //firebase
      const googleCredential = GoogleAuthProvider.credential(
        response.data?.idToken,
      );
      return signInWithCredential(getAuth(), googleCredential);
    } catch (error: any) {
      alert("Error: " + error.message + ". Please try again.");
    }
  };

  // const handleAppleSignIn = async () => {
  //   try {
  //     const response = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  //     });

  //     if (!response.identityToken) {
  //       throw new Error("Authentication Failed.");
  //     }

  //     //firebase
  //     const { identityToken, nonce } = response;
  //     const appleCredential = AppleAuthProvider.credential(
  //       identityToken,
  //       nonce,
  //     );

  //     return signInWithCredential(getAuth(), appleCredential);
  //   } catch (error) {}
  // };

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
