import { ColorPalette, FontSize } from "@/constants/useTheme";
import { auth } from "@/firebase";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddQuotes from "./AddQuotes";
import { handleGetQuotes } from "./quoteServices";

export interface quotesList {
  docID: string;
  quote: string;
  title: string;
  author: string;
  page: string;
  line: string;
}

type Props = {
  keyboardHeight: number;
  isKeyboardVisible: boolean;
};

const DisplayQuotes = ({ keyboardHeight, isKeyboardVisible }: Props) => {
  const uid = auth.currentUser?.uid;
  const [quotes, setQuotes] = useState<quotesList[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editItem, setEditItem] = useState<quotesList>();

  useEffect(() => {
    const quotesList = async () => {
      if (uid === undefined) return;
      try {
        const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
          await handleGetQuotes(uid);
        let qlist: quotesList[] = [];
        querySnapshot.forEach((doc) => {
          let l = "";
          let p = "";

          if (doc.data().page !== undefined) {
            p = "P" + doc.data().page;
          }
          if (doc.data().line !== undefined) {
            l = "L" + doc.data().line;
          }

          qlist.push({
            docID: doc.id,
            quote: doc.data().quote,
            title: doc.data().title,
            author: doc.data().author,
            page: p,
            line: l,
          });
        });
        setQuotes(qlist);
      } catch (error) {
        console.log("Error displaying quotes " + error);
        setFailed(true);
        setLoading(false);
      }
      setLoading(false);
    };
    quotesList();
  }, []);

  // On edit pressed
  const onEditPressed = (item: quotesList) => {
    setEditItem(item);
    setEditVisible(true);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (failed) {
    return <Text>Failed to display quotes</Text>;
  }

  if (quotes.length === 0) {
    return (
      <View style={styles.noneContainer}>
        <Text style={styles.noneText}>Save your first quote</Text>
        <MaterialCommunityIcons name="arrow-top-right-thick" size={23} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isEditVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Close?", "Draft will not be saved.", [
                { text: "Continue Editing", style: "cancel" },
                {
                  text: "Close",
                  style: "destructive",
                  onPress: () => setEditVisible(false),
                },
              ]);
            }}
          >
            <Ionicons name="close" size={20} style={styles.closeIcon} />
          </TouchableOpacity>

          <AddQuotes
            setEditVisible={setEditVisible}
            list={editItem}
            keyboardHeight={keyboardHeight}
            isKeyboardVisible={isKeyboardVisible}
          />
        </View>
      </Modal>

      <View>
        <View style={styles.searchBar}>
          <Ionicons name="search" color={ColorPalette.muted} size={16} />
          <TextInput style={styles.searchBarInput} placeholder="title/author" />
        </View>
        <FlatList
          style={styles.flatlist}
          data={quotes}
          renderItem={({ item }) => (
            <View style={styles.quotesContainer}>
              <Text style={styles.quotesContent}>{item.quote}</Text>

              <View style={styles.subtextContainer}>
                <Text style={styles.quotesSubtext}>
                  - {item.author}, {item.title} {item.page} {item.line}
                </Text>

                <MaterialIcons
                  name="edit"
                  size={15}
                  style={styles.editIcon}
                  onPress={() => onEditPressed(item)}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DisplayQuotes;

const styles = StyleSheet.create({
  closeIcon: { paddingLeft: 10 },
  flatlist: {
    paddingBottom: 60,
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
  subtextContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  quotesSubtext: {
    color: ColorPalette.muted,
    fontSize: FontSize.sub,
  },
  noneContainer: {
    alignSelf: "center",
    height: "100%",
    paddingTop: 50,
    flexDirection: "row",
  },
  noneText: {
    fontSize: FontSize.large,
    fontWeight: "700",
    paddingRight: 4,
  },
  searchBar: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 15,
    width: "75%",
    alignSelf: "center",
    padding: 8,
    flexDirection: "row",
    marginBottom: 10,
  },
  searchBarInput: {
    paddingLeft: 5,
    fontSize: 13,
  },
  editIcon: {
    marginLeft: 3,
    color: ColorPalette.muted,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    height: "100%",
    flex: 1,
  },
});
