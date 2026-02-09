import AddQuotes from "@/components/AddQuotes";
import OpenModal from "@/components/Modal";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const quotes = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const onClose = () => {
    setModalVisible(false);
  };

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setModalVisible(true)} title="+" />
      ),
    });
  });

  return (
    <View>
      <View>
        <OpenModal isVisible={isModalVisible} onClose={onClose}>
          <View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Close?", "Draft will not be saved.", [
                  { text: "Continue Editing", style: "cancel" },
                  { text: "Close", style: "destructive", onPress: onClose },
                ]);
              }}
            >
              <Ionicons name="close" size={20} style={styles.closeIcon} />
            </TouchableOpacity>

            <AddQuotes />
          </View>
        </OpenModal>

        <View style={styles.searchBar}>
          <Ionicons name="search" color={ColorPalette.muted} size={16} />
          <TextInput style={styles.searchBarInput} placeholder="title/author" />
        </View>

        <ScrollView style={styles.quotesListContainer}>
          <View style={styles.quotesContainer}>
            <Text style={styles.quotesContent}>Quotes here</Text>
            <Text style={styles.quotesSubtext}>
              - arthor, title, page, line
            </Text>
          </View>
          <View style={styles.quotesContainer}>
            <Text style={styles.quotesContent}>Quotes here</Text>
            <Text style={styles.quotesSubtext}>
              - arthor, title, page, line
            </Text>
          </View>

          <View style={styles.quotesContainer}>
            <Text style={styles.quotesContent}>Quotes here</Text>
            <Text style={styles.quotesSubtext}>
              - arthor, title, page, line
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default quotes;

const styles = StyleSheet.create({
  closeIcon: { paddingLeft: 10 },
  searchBar: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 15,
    width: "75%",
    alignSelf: "center",
    marginTop: 20,
    padding: 8,
    flexDirection: "row",
  },
  searchBarInput: {
    paddingLeft: 5,
    fontSize: 13,
  },
  quotesListContainer: {
    marginTop: 10,
  },
  quotesContainer: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderStyle: "solid",
    width: "85%",
    alignSelf: "center",
    padding: 8,
    marginTop: 15,
  },
  quotesContent: {
    color: ColorPalette.text,
    fontSize: FontSize.text,
  },
  quotesSubtext: {
    color: ColorPalette.muted,
    alignSelf: "flex-end",
    paddingRight: 10,
    fontSize: FontSize.sub,
  },
});
