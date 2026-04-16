import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";

type Props = {
  setModalVisible: (isVisible: boolean) => void;
  withAlert: boolean;
};

const ModalCloseBtn = ({ setModalVisible, withAlert }: Props) => {
  return (
    <View>
      {withAlert ? (
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Close?", "Changes will not be saved.", [
              { text: "Continue Editing", style: "cancel" },
              {
                text: "Close",
                style: "destructive",
                onPress: () => setModalVisible(false),
              },
            ]);
          }}
        >
          <Ionicons name="close" size={20} style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ alignSelf: "flex-start", padding: 5 }}
        >
          <Ionicons name="close" size={20} style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModalCloseBtn;
