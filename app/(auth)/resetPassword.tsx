import { ColorPalette, FontSize } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createAccount = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetPass = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      alert("Password reset email is sent. Check your mail box.");
      router.dismiss();
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        alert("Invalid Email.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <Ionicons
        name="arrow-back"
        size={20}
        style={styles.backIcon}
        onPress={router.back}
      />
      <View style={styles.container}>
        <View style={styles.resetPassContainer}>
          <Text style={styles.signInTitle}>Reset Password</Text>
          <Text style={styles.resetPassSubText}>
            Enter your Email to reset your password
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor={ColorPalette.muted}
            style={styles.signInInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.signInBtn} onPress={handleResetPass}>
            <Text style={styles.signInBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default createAccount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    paddingLeft: 15,
    paddingTop: 20,
  },
  resetPassContainer: {
    alignItems: "center",
    marginTop: "60%",
  },
  signInTitle: {
    fontSize: FontSize.title,
    fontWeight: "600",
    marginBottom: 20,
  },
  signInInput: {
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    width: "100%",
    marginTop: 10,
  },
  signInBtn: {
    backgroundColor: ColorPalette.success,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  signInBtnText: {
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: FontSize.sub,
    color: ColorPalette.background,
  },
  resetPassSubText: {
    color: ColorPalette.muted,
  },
});
