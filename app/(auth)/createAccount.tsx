import { ColorPalette, FontSize } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
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
  const navSignIn = () => {
    router.navigate("/login");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleCreateAccount = async () => {
  //     try {
  //         const auth = getAuth();
  //       const userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password,
  //       );
  //       await sendEmailVerification();
  //       await signOut(getAuth());

  //       alert(
  //         "Email verification link is sent. Check your mail box to activate your account.",
  //       );
  //       navSignIn();
  //     } catch (error: any) {
  //       if (error.code === "auth/email-already-in-use") {
  //         Alert.alert(
  //           "Sign Up Failed",
  //           "This email is already used. Do you want to Sign in instead?",
  //           [
  //             { text: "Cancel", style: "cancel" },
  //             { text: "Sign In", onPress: navSignIn },
  //           ],
  //         );
  //       } else if (error.code === "auth/invalid-email") {
  //         alert("Invalid Email.");
  //       } else {
  //         alert("Error: " + error.message);
  //       }
  //     }
  //   };

  return (
    <SafeAreaView>
      <Ionicons
        name="arrow-back"
        size={20}
        style={styles.backIcon}
        onPress={router.back}
      />
      <View style={styles.container}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInTitle}>Create Account</Text>
          <TextInput
            placeholder="E-mail"
            style={styles.signInInput}
            placeholderTextColor={ColorPalette.muted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={ColorPalette.muted}
            style={styles.signInInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.signInBtn}>
            <Text style={styles.signInBtnText}>Create</Text>
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
  backIcon: { paddingLeft: 15, paddingTop: 20 },
  signInContainer: {
    width: "60%",
    marginTop: "50%",
    alignItems: "center",
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
});
