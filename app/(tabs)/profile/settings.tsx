import { ColorPalette } from "@/constants/useTheme";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  handleGetUsername,
  handleSignOut,
  handleUpdateUsername,
} from "../../../features/profile/services";
import styles from "../../../features/profile/styles";
import { auth } from "../../../firebase";

export default function settings() {
  // get user's current username
  const [name, setName] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const currUser = auth.currentUser?.uid;

  // get username whenever setting page is opened
  useEffect(() => {
    const getName = async () => {
      if (currUser === undefined) return;
      const n = await handleGetUsername(currUser);
      setName(n);
    };
    getName();
  }, []);

  const updateUsername = async () => {
    try {
      if (currUser == null) return;

      await handleUpdateUsername(currUser, displayName);

      setName(displayName);
      setVisible(false);
      Alert.alert("Username changed successfully");
    } catch (error) {
      Alert.alert("", "Failed to update username.");
    }
  };

  // display form
  const [isVisible, setVisible] = useState(false);

  const onCloseBtn = () => {
    setVisible(false);
  };

  const onClose = () => {
    Alert.alert("Close? ", "Changes will not be saved.", [
      {
        text: "Continue Editing",
        style: "cancel",
      },
      {
        text: "Discard Changes",
        style: "destructive",
        onPress: onCloseBtn,
      },
    ]);
  };

  return (
    <SafeAreaView>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.container}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}> Hello {name} 👋</Text>

          {!isVisible && (
            <Pressable onPress={() => setVisible(true)} style={styles.editBtn}>
              <Text>Edit Username</Text>
            </Pressable>
          )}

          {isVisible && (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.usernameInput}
                placeholder={"New Username"}
                placeholderTextColor={ColorPalette.muted}
                value={displayName}
                onChangeText={(text) => setDisplayName(text)}
              />
              <View style={styles.updateBtnContainer}>
                <TouchableOpacity style={styles.updateBtn} onPress={onClose}>
                  <Text style={{ fontSize: 12 }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={updateUsername}
                >
                  <Text style={{ fontSize: 12 }}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.redBtnContainer}
        >
          <Text style={styles.redBtnText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redBtnContainer}
          onPress={() => alert("implement deleteUser function first!!")}
        >
          <Text style={styles.redBtnText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
