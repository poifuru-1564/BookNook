import CoverImage from "@/components/CoverImage";
import KeyboardHideBtn from "@/components/KeyboardHideBtn";
import Loading from "@/components/Loading";
import MyButton from "@/components/MyButton";
import { ColorPalette } from "@/constants/constantValues";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../formStyle";
import useAddBook from "../hooks/useAddBook";
import Scan from "./Scan";

type Props = {
  setAddBookVisible: (isAddBookVisible: boolean) => void;
  initTitle?: string;
  initAuthor?: string;
  initISBN?: string;
};

const AddBook = ({
  setAddBookVisible,
  initAuthor,
  initTitle,
  initISBN,
}: Props) => {
  const {
    isbn,
    setISBN,
    author,
    setAuthor,
    title,
    setTitle,
    pageNum,
    setPageNum,
    searchRes,
    isManualLinkVisible,
    isFailed,
    isSearchFin,
    loading,
    keyboardHeight,
    isKeyboardVisible,
    fetchByISBN,
    fetchByName,
    onSelected,
    onManuallyBtnPressed,
    onManualLinkPressed,
    onSearchAgainPressed,
    manualInput,
  } = useAddBook(setAddBookVisible, initAuthor, initTitle, initISBN);

  const [isScanModalVisible, setScanModalVisible] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={isScanModalVisible}
        animationType="slide"
        onDismiss={() => CameraView.dismissScanner()}
      >
        <Scan setISBN={setISBN} setVisible={setScanModalVisible} />
      </Modal>

      <View style={styles.addContainer}>
        <Text style={styles.addHeader}>Add Book to Wishlist</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Search from ISBN</Text>

          <View style={styles.isbnSearchContainer}>
            <TextInput
              style={styles.isbnInput}
              placeholder="ISBN-10 / ISBN-13"
              placeholderTextColor={ColorPalette.muted}
              keyboardType="number-pad"
              value={isbn}
              onChangeText={(text) => setISBN(text)}
              onSubmitEditing={fetchByISBN}
              maxLength={13}
            />
            <TouchableOpacity style={styles.barcodeIconContainer}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={25}
                style={styles.barcodeIcon}
                onPress={() => {
                  setScanModalVisible(true);
                }}
              />
            </TouchableOpacity>
          </View>
          <MyButton onPressAction={() => fetchByISBN()} label="Search" />
        </View>

        <View style={styles.border}></View>

        {/* google books search */}
        {!isFailed && !isSearchFin && (
          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Search from title or author</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={ColorPalette.muted}
              value={title}
              onChangeText={(text) => setTitle(text)}
              returnKeyType="done"
            />
            <TextInput
              style={styles.input}
              placeholder="Author"
              placeholderTextColor={ColorPalette.muted}
              value={author}
              onChangeText={(text) => setAuthor(text)}
              returnKeyType="done"
            />

            {isManualLinkVisible && (
              <TouchableOpacity
                onPress={() => onManualLinkPressed()}
                style={styles.noMatchContainer}
              >
                <Text style={styles.noMatchText}>Manually add a book</Text>
                <Text style={styles.noMatchSubtext}>
                  * cover image will be not available *
                </Text>
              </TouchableOpacity>
            )}
            <MyButton onPressAction={() => fetchByName()} label="Search" />
          </View>
        )}

        {/* input manually */}
        {isFailed && !isSearchFin && (
          <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>Enter book info manually</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={ColorPalette.muted}
              value={title}
              onChangeText={(text) => setTitle(text)}
              returnKeyType="done"
            />
            <TextInput
              style={styles.input}
              placeholder="Author"
              placeholderTextColor={ColorPalette.muted}
              value={author}
              onChangeText={(text) => setAuthor(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Book Length (optional)"
              placeholderTextColor={ColorPalette.muted}
              keyboardType="number-pad"
              value={pageNum}
              onChangeText={(text) => setPageNum(text)}
            />

            <MyButton onPressAction={() => manualInput()} label="Save" />
          </View>
        )}

        {/* display serach results */}
        {isSearchFin && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Search Results</Text>
            <FlatList
              data={searchRes}
              style={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.bookContainer}>
                  <TouchableOpacity
                    style={styles.bookInnerContainer}
                    onPress={() =>
                      Alert.alert("", "Add this to your wishlist?", [
                        { text: "No", style: "cancel" },
                        { text: "yes", onPress: () => onSelected(item) },
                      ])
                    }
                  >
                    <View style={styles.bookCoverImage}>
                      <CoverImage url={item.imageLink} />
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.descriptionText}>{item.title}</Text>
                      <Text style={styles.descriptionText}>{item.author}</Text>
                      <Text style={styles.descriptionText}>{item.isbn}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={
                <View style={styles.listFooterContainer}>
                  <MyButton
                    onPressAction={() => onSearchAgainPressed()}
                    label="Search"
                  />

                  <Text style={{ padding: 10 }}>
                    Can't find a matching book?
                  </Text>
                  <TouchableOpacity onPress={() => onManuallyBtnPressed()}>
                    <Text style={styles.noMatchText}>Enter Manually</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        )}

        {isKeyboardVisible && (
          <KeyboardHideBtn keyboardHeight={keyboardHeight} />
        )}
      </View>
    </View>
  );
};

export default AddBook;
