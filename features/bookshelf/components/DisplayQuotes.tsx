import Loading from "@/components/Loading";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import { ColorPalette, FontSize } from "@/constants/constantValues";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useDisplayQuotes from "../hooks/useDisplayQuotes";
import AddQuotes from "./AddQuotes";

type Props = {
  keyboardHeight: number;
  isKeyboardVisible: boolean;
};

const DisplayQuotes = ({ keyboardHeight, isKeyboardVisible }: Props) => {
  const {
    refresh,
    filter,
    onEditPressed,
    quotes,
    loading,
    refreshing,
    failed,
    isEditVisible,
    setEditVisible,
    editItem,
    filterType,
    setFilterType,
    filterText,
    setFilterText,
  } = useDisplayQuotes();
  if (loading) {
    return <Loading />;
  }

  if (failed) {
    return <Text>Failed to display quotes</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isEditVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ModalCloseBtn setModalVisible={setEditVisible} withAlert={true} />

          <AddQuotes
            setEditVisible={setEditVisible}
            list={editItem}
            keyboardHeight={keyboardHeight}
            isKeyboardVisible={isKeyboardVisible}
          />
        </View>
      </Modal>

      <View style={styles.searchBarContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 25,
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              onPress={() => {
                setFilterType("author");
              }}
              name={
                filterType === "author"
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
              style={{
                marginRight: 5,
              }}
              size={20}
            />

            <Text>Author</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              onPress={() => {
                setFilterType("title");
              }}
              name={
                filterType === "title"
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
              style={{
                marginRight: 5,
              }}
              size={20}
            />
            <Text>Title</Text>
          </View>

          <Text
            onPress={() => {
              setFilterType(null);
              setFilterText("");
              refresh();
            }}
            style={{
              fontSize: FontSize.sub,
              alignSelf: "center",
              textDecorationColor: ColorPalette.muted,
              textDecorationLine: "underline",
              color: ColorPalette.blue,
              marginLeft: 10,
            }}
          >
            Reset
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchBarInput}
              placeholder="Search by Title"
              value={filterText}
              onChangeText={(text) => setFilterText(text)}
            />
          </View>
          <TouchableOpacity onPress={() => filter()} style={styles.searchIcon}>
            <Ionicons name="search" color={ColorPalette.muted} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{ flex: 1, marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        data={quotes}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <View style={styles.noneContainer}>
            <Text style={styles.noneText}>Save your first quote</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.quotesContainer}>
            <Text style={styles.quotesContent}>{item.quote}</Text>

            <View style={styles.subtextOuterContainer}>
              <View style={styles.subtextContainer}>
                <Text style={styles.quotesSubtext}>- {item.author},</Text>
                <Text style={styles.quotesSubtext}>{item.title}</Text>
                <Text style={styles.quotesSubtext}>
                  {item.page} {item.line}
                </Text>
              </View>
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
  );
};

export default DisplayQuotes;

const styles = StyleSheet.create({
  quotesContainer: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
  quotesContent: {
    color: ColorPalette.text,
    fontSize: FontSize.text,
    padding: 8,
  },
  subtextOuterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 3,
    paddingBottom: 3,
  },
  subtextContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  quotesSubtext: {
    color: ColorPalette.muted,
    fontSize: FontSize.sub,
  },

  noneContainer: {
    alignSelf: "center",
    height: "100%",
    paddingTop: 50,
  },
  noneText: {
    fontWeight: "600",
    paddingRight: 4,
  },

  refreshText: {
    color: ColorPalette.blue,
    alignSelf: "center",
    paddingTop: 5,
  },
  searchBarContainer: {
    paddingHorizontal: 30,
  },

  searchBar: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 6,
    marginBottom: 5,
    flex: 1,
  },
  searchBarInput: {
    paddingLeft: 5,
    fontSize: FontSize.sub,
  },
  searchIcon: {
    marginLeft: 10,
  },
  editIcon: {
    alignSelf: "center",
    color: ColorPalette.muted,
    justifyContent: "flex-end",
    paddingLeft: 3,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    height: "100%",
    flex: 1,
  },
});
