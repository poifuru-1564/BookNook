import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import Loading from "@/components/Loading";
import { ColorPalette } from "@/constants/constantValues";
import { styles } from "@/features/auth/authStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogin } from "../useLogin";

export default function LoginScreen() {
  const {
    loading,
    email,
    setEmail,
    password,
    setPassword,
    googleSignIn,
    signin,
  } = useLogin();

  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <View style={styles.loginOuterContainer}>
        <Image
          source={require("../../../img/appIcon.png")}
          style={styles.iconPic}
        />
        <View style={styles.innerContainer}>
          <View style={styles.signInContainer}>
            <TextInput
              style={styles.inputContainer}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              placeholderTextColor={ColorPalette.muted}
            />
            <TextInput
              style={styles.inputContainer}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor={ColorPalette.muted}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={() => signin()}
              style={styles.signinBtnContainer}
            >
              <Text style={styles.signinBtn}>Sign In</Text>
            </TouchableOpacity>
            <Text
              style={styles.resetText}
              onPress={() => router.navigate("/resetPassword")}
            >
              Forgot Password?
            </Text>
          </View>

          <View style={styles.bordelineContainer}>
            <View style={styles.borderline}></View>
            <Text style={styles.borderlineText}>or</Text>
            <View style={styles.borderline}></View>
          </View>

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            onPress={() => googleSignIn()}
            color={GoogleSigninButton.Color.Light}
            style={{ alignSelf: "center" }}
          />
          <View style={styles.bordelineContainer}>
            <View style={styles.borderline}></View>
            <Text style={styles.borderlineText}>or</Text>
            <View style={styles.borderline}></View>
          </View>

          <View style={styles.createContainer}>
            <Text style={styles.text}>New to Book Nook?</Text>
            <TouchableOpacity onPress={() => router.navigate("/createAccount")}>
              <Text style={styles.createLinkText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
