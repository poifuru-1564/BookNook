import Loading from "@/components/Loading";
import { ColorPalette } from "@/constants/constantValues";
import { handleCreateAccount } from "@/features/auth/authServices";
import { styles } from "@/features/auth/authStyles";
import { validatePassword } from "@/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAccountScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const validInput = await validatePassword(email, password);
    if (!validInput.isValid) {
      Alert.alert("Invalid Inputs", validInput.message);
      return;
    }

    try {
      const success = await handleCreateAccount(email.trim(), password.trim());
      if (success) {
        Alert.alert(
          "Verification Sent",
          "Please check your mail box and verify your Email.",
        );
        router.dismiss(1);
      } else {
        Alert.alert("Failed", "Failed to create account. Please try again");
      }
    } catch (error: any) {
      Alert.alert("Failed" + error.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.outerContainer} edges={["top", "bottom"]}>
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={20} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Create Account</Text>
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

            <Text style={styles.passReqText}>
              * At least 8 characters including upper, lower, and numeric
              characters
            </Text>
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={styles.signinBtnContainer}
            >
              <Text style={styles.signinBtn}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
