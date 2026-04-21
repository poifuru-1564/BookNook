import { validatePassword } from "@/utils/validation";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { handleEmailSignIn, handleGoogleSignIn } from "./authServices";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    });
  }, []);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      await handleGoogleSignIn();
    } catch (error: any) {
      Alert.alert("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signin = async () => {
    const validInput = await validatePassword(email, password);
    if (!validInput.isValid) {
      Alert.alert("Invalid Inputs: ", validInput.message);
      return;
    }

    try {
      setLoading(true);
      const login = await handleEmailSignIn(email, password);
      if (!login) {
        Alert.alert(
          "Sign in Failed",
          "Invalid credentials or email not verified. ",
        );
        setLoading(false);
        return;
      }
    } catch (error: any) {
      Alert.alert("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    email,
    setEmail,
    password,
    setPassword,
    googleSignIn,
    signin,
  };
};
