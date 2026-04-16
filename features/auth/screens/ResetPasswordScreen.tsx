import { ColorPalette } from "@/constants/constantValues";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleResetPassword } from "../authServices";
import { styles } from "../authStyles";

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    if (email.trim().length === 0) {
      Alert.alert("Missing Input", "Enter your Email");
      return;
    }

    try {
      const success = await handleResetPassword(email);
      if (success)
        Alert.alert("Email sent", "Check your mailbox to reset your password");
      router.dismiss(1);
    } catch (error: any) {
      Alert.alert("Error: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer} edges={["top"]}>
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={20} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.resetPassSubText}>
          Enter your Email to reset your password
        </Text>
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

            <TouchableOpacity
              onPress={() => resetPassword()}
              style={styles.signinBtnContainer}
            >
              <Text style={styles.signinBtn}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
