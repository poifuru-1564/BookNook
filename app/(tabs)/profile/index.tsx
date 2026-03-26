import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleGetProfile } from "../../../features/profile/services";
import styles from "../../../features/profile/styles";
import { auth } from "../../../firebase";

export default function profile() {
  const router = useRouter();
  const navSettings = () => {
    router.navigate("/profile/settings");
  };

  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const uid = auth.currentUser?.uid;
      if (uid === undefined) return;
      try {
        const data = await handleGetProfile(uid);
        if (data != null) {
          setTotal(data.finishedBooks);
          setProgress(data.booksInProgress);
          setPages(data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getStats();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>

          {/* Open side bar */}
          <Pressable onPress={navSettings} style={styles.settingIcon}>
            <Ionicons name="settings-outline" size={20} />
          </Pressable>
        </View>

        <View style={styles.container}>
          <View style={styles.calendarContainer}>
            <Text>*Calendar*</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Stats</Text>
            <View style={styles.stats}>
              <FontAwesome6 name="book" size={25} style={styles.statsIcon} />
              <View style={styles.statsTextContainer}>
                {total <= 1 && (
                  <Text style={styles.statsText}>{total} book</Text>
                )}
                {total > 1 && (
                  <Text style={styles.statsText}>{total} books</Text>
                )}

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
                {progress <= 1 && (
                  <Text style={styles.statsText}>{progress} book</Text>
                )}
                {progress > 1 && (
                  <Text style={styles.statsText}>{progress} books</Text>
                )}
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
                <Text style={styles.statsText}>{pages} pages</Text>
                <Text style={styles.statsSubtext}>Total Pages Read</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
