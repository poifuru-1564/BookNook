import CoverImage from "@/components/CoverImage";
import KeyboardHideBtn from "@/components/KeyboardHideBtn";
import { Book, googleBookList } from "@/constants/interface";
import { ColorPalette } from "@/constants/useTheme";
import { auth } from "@/firebase";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardEventListener,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  handleAddBook,
  handleAddToWishlist,
  handleGetBook,
  handleManualInput,
} from "./bookServices";
import styles from "./formStyle";
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
  const [isbn, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [pageNum, setPageNum] = useState("");

  const [searchRes, setSearchRes] = useState<Book[]>([]);
  const [isFailed, setisFailed] = useState(false); // display manual input form
  const [isSearchFin, setisSearchFin] = useState(false); // display input for google books
  const [isManualLinkVisible, setisManualLinkVisible] = useState(false); // display when title/author search failed
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isScanModalVisible, setScanModalVisible] = useState(false);
  const uid = auth.currentUser?.uid;

  const fetchByISBN = async () => {
    if (isbn.trim().length !== 10 && isbn.trim().length !== 13) {
      Alert.alert("Invalid ISBN", "ISBNs must be 10 or 13 digits long");
      return;
    }
    const param = "isbn:" + isbn.trim();
    console.log(param);

    // start search
    setLoading(true);

    const doc = await handleGetBook(isbn.trim());
    if (!doc) {
      fetchBook(param);
    } else {
      console.log(
        "fetchByISBN() Already exist in books collection. -> onSelected",
      );
      // already in the books collection -> display -> select
      const data = doc.data();
      if (data === undefined) {
        fetchBook(param);
      } else {
        console.log("Found in book's collection");
        setSearchRes([
          {
            isbn: doc.id,
            title: data.title,
            author: data.author,
            pageCount: data.pageCount,
            imageLink: data.imageLink,
          },
        ]);
        setLoading(false);
        setisSearchFin(true);
      }
    }
  };

  const fetchByName = async () => {
    let param = "";
    if (author.trim().length === 0 && title.trim().length === 0) {
      Alert.alert("No input", "Fill in either title or author");
      return;
    }
    if (author.trim().length !== 0) {
      param = "inauthor:" + author.trim();
    }

    if (title.trim().length !== 0) {
      if (param.length === 0) {
        param = param + "intitle:" + title.trim();
      } else {
        param = param + "+intitle:" + title.trim();
      }
    }

    console.log(param);

    setLoading(true);
    fetchBook(param);
  };

  const fetchBook = async (param: string) => {
    try {
      const base =
        "https://asia-northeast1-booknook-4162c.cloudfunctions.net/bookApi";
      const res = await fetch(`${base}?q=${param}`);
      if (!res.ok) {
        Alert.alert(
          "",
          "Failed to fetch book description. Enter book info manually.",
        );
        setisFailed(true);
        return;
      }
      // read res body, parse the json, return a JS object
      const data: googleBookList = await res.json();

      if (data.totalItems === 0) {
        Alert.alert("Match Not Found", "Check if your input is correct");
        setisManualLinkVisible(true);
        setLoading(false);
        return;
      }

      const list: Book[] = data.items.map((item) => {
        const field = item.volumeInfo;

        let link = field.imageLinks?.smallThumbnail;

        if (link !== undefined) {
          link = link.replace("http:", "https:");
        }

        return {
          isbn:
            field.industryIdentifiers?.find((isbn) => isbn.type === "ISBN_13")
              ?.identifier ||
            field.industryIdentifiers?.find((isbn) => isbn.type === "ISBN_10")
              ?.identifier ||
            "ISBN N/A",
          title: field.title || "Title N/A",
          author: field.authors || "Author N/A",
          pageCount: field.pageCount || -1,
          imageLink: link || "N/A",
        };
      });

      setSearchRes(list);
      setLoading(false);
      setisSearchFin(true);
    } catch (error) {
      setLoading(false);
      alert("network error");
      console.log("Error in fetchBook(): " + error);
      setisFailed(true);
    }
  };

  // check if isbn is already in books collection -> null -> call fetchBook
  // json -> select -> input info into form field -> onPress -> store in books db -> store to user's book collection
  // -> redirect to Wishlist -> display

  const onSelected = async (item: Book) => {
    try {
      if (typeof uid !== "string") return;

      let page: string = "";
      page = page + item.pageCount;

      //  no ISBN
      if (item.isbn === "ISBN N/A") {
        await handleManualInput(
          uid,
          item.title,
          item.author,
          page,
          item.imageLink,
        );
        Alert.alert("", "Added to your wishlist");
        setAddBookVisible(false);
        return;
      }

      // add to book collection
      await handleAddBook(item);

      // add to user's bookshelf, set status to wishlist
      await handleAddToWishlist(uid, item.isbn, item.imageLink, item.title);

      Alert.alert("", "Added to your wishlist");
      setAddBookVisible(false);
    } catch (error) {
      console.log("Error onSelected(): " + error);
      Alert.alert("", "Failed to add book to your wishlist. Please try again.");
    }
  };

  const onManuallyBtnPressed = async () => {
    setisSearchFin(false);
    setisFailed(true);
  };

  const onManualLinkPressed = () => {
    setisManualLinkVisible(false);
    setisFailed(true);
  };

  const onSearchAgainPressed = () => {
    setisSearchFin(false);
    setisFailed(false);
  };

  const manualInput = async () => {
    try {
      if (typeof uid !== "string") return;
      await handleManualInput(uid, title, author, pageNum);
      Alert.alert("", "Added to your wishlist");
      setAddBookVisible(false);
    } catch (error) {
      console.log("Error manualInput" + error);
      Alert.alert("", "Failed to add book to your wishlist. Please try again");
    }
  };

  // keyboard
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow,
    );

    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // adding from book recommendation page
  useEffect(() => {
    if (initAuthor !== undefined && initTitle !== undefined) {
      setAuthor(initAuthor);
      setTitle(initTitle);
    }

    if (initISBN !== undefined) {
      setISBN(initISBN);
    }
  }, []);

  const handleKeyboardShow: KeyboardEventListener = (event) => {
    setKeyboardHeight(event.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const handleKeyboardHide: KeyboardEventListener = (event) => {
    setKeyboardVisible(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={isScanModalVisible} animationType="slide">
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
          <View style={styles.btnOuterContainer}>
            <TouchableOpacity
              style={styles.btnInnerContainer}
              onPress={() => fetchByISBN()}
            >
              <View style={styles.btn}>
                <Feather name="search" style={styles.icon} size={16} />
                <Text>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
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

            <View style={styles.btnOuterContainer}>
              <TouchableOpacity
                style={styles.btnInnerContainer}
                onPress={fetchByName}
              >
                <View style={styles.btn}>
                  <Feather name="search" style={styles.icon} size={16} />
                  <Text>Search</Text>
                </View>
              </TouchableOpacity>
            </View>
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

            <View style={styles.btnOuterContainer}>
              <TouchableOpacity
                style={styles.btnInnerContainer}
                onPress={() => manualInput()}
              >
                <View style={styles.btn}>
                  <Entypo name="plus" style={styles.icon} size={16} />
                  <Text>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
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
                  <View style={styles.btnOuterContainer}>
                    <TouchableOpacity
                      style={styles.btnInnerContainer}
                      onPress={() => onSearchAgainPressed()}
                    >
                      <View style={styles.btn}>
                        <Feather name="search" style={styles.icon} size={16} />
                        <Text>Search Again</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

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
