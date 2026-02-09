import AddBook from "@/components/AddBook";
import OpenModal from "@/components/Modal";
import { ColorPalette } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const wishlist = () => {
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
    <ScrollView>
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

          <AddBook />
        </View>
      </OpenModal>

      <View style={styles.bkListContainer}>
        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <TouchableOpacity>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <TouchableOpacity>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <TouchableOpacity>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bkContainer}>
          <Text>Title Here</Text>
          <TouchableOpacity>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default wishlist;

const styles = StyleSheet.create({
  closeIcon: {
    paddingLeft: 10,
  },
  bkListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    gap: "5%",
    marginTop: 20,
  },
  bkContainer: {
    width: "30%",
    height: 150,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: ColorPalette.card,
  },
});
