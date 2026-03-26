import { ColorPalette, FontSize } from "@/constants/useTheme";
import AddBook from "@/features/bookshelf/AddBook";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type genre = {
  id: number;
  genre: string;
  selected: boolean;
};

type length = {
  id: number;
  length: string;
  selected: boolean;
};

type searchResult = {
  bookTitle: string;
  author: string;
  genres: string;
  details: string;
};

const iniGenreList: genre[] = [
  { id: 0, genre: "Fiction", selected: false },
  { id: 1, genre: "Non-Fiction", selected: false },
  { id: 2, genre: "Historical Fiction", selected: false },
  { id: 3, genre: "Science Fiction", selected: false },
  { id: 4, genre: "Romance", selected: false },
  { id: 5, genre: "Mystery", selected: false },
  { id: 6, genre: "Adventure", selected: false },
  { id: 7, genre: "Young Adults", selected: false },
  { id: 8, genre: "Thriller", selected: false },
  { id: 9, genre: "Classics", selected: false },
  { id: 10, genre: "Contemporary", selected: false },
  { id: 11, genre: "Self-Help", selected: false },
];

const iniLengthList: length[] = [
  { id: 0, length: "~ 250p", selected: false },
  { id: 1, length: "~ 500p", selected: false },
  { id: 2, length: "~ 750p", selected: false },
  { id: 3, length: "1000p ~", selected: false },
];

const recommendation = () => {
  const [favAuthor, setFavAuthor] = useState("");
  const [favBook, setFavBook] = useState("");
  const [keywords, setKeyword] = useState("");

  const [genreList, setGenreList] = useState(iniGenreList);
  const [lengthList, setLengthList] = useState(iniLengthList);

  const [searchRes, setSearchRes] = useState<searchResult[]>([]);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAddBookVisible, setAddBookVisible] = useState(false);
  const [addBookTitle, setAddBookTitle] = useState("");
  const [addBookAuthor, setAddBookAuthor] = useState("");

  const toggleGenre = (itemID: number) => {
    setGenreList(
      genreList.map((item) => {
        if (item.id === itemID) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      }),
    );
  };

  const toggleLength = (itemID: number) => {
    setLengthList(
      lengthList.map((item) => {
        if (item.id === itemID) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      }),
    );
  };

  const genreToString = () => {
    let li = "";
    for (const data of genreList) {
      if (data.selected) {
        li += `${data.genre},`;
      }
    }

    if (li.trim().length === 0) {
      return null;
    }
    return li.slice(0, li.length - 1);
  };

  const lengthToString = () => {
    let li = "";
    for (const data of lengthList) {
      if (data.selected) {
        li += `${data.length},`;
      }
    }
    if (li.trim().length === 0) {
      return null;
    }

    return li.slice(0, li.length - 1);
  };

  const handleSearch = async () => {
    const bkgenre = genreToString();
    if (bkgenre === null) {
      Alert.alert(
        "Missing Field",
        "Please select at least one genre for better search. ",
      );
      return;
    }
    const bklength = lengthToString();

    let prompt = `Give 5 book recommendations. Return only valid JSON. Format is 
    [
        {
           "author" : "string",
           "bookTitle: "string",
           "details" : "string"
           "genres": "string" 
    }] 
    Details should be 1-2 sentences. Make it catchy and compelling. 
    Books should match these genres : ${bkgenre}. `;

    if (bklength !== null) {
      prompt += `The length of the books should be about ${bklength}.\n`;
    }

    if (favAuthor.trim().length !== 0) {
      prompt += `Prioritize books similar to style of ${favAuthor}.\n`;
    }

    if (favBook.trim().length !== 0) {
      prompt += `Give a book for those enjoyed reading ${favBook}, but do not include this in the search result.\n`;
    }

    if (keywords.trim().length !== 0) {
      prompt += `Additional keywords for the search: ${keywords}.\n`;
    }

    console.log(prompt);

    try {
      setLoading(true);
      const base = "https://geminiapi-elqywp3c4a-an.a.run.app";
      const res = await fetch(base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: prompt,
        }),
      });
      if (!res.ok) {
        Alert.alert("", "Search failed. Please try again later. ");

        const text = await res.text();
        console.log("Server error:", res.status, text);
        setLoading(false);
        return;
      }
      const data: searchResult[] = await res.json();
      setSearchRes(data);
      console.log(data);

      Alert.alert("", "search success");
      setSearchSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("network error");
      console.log("Error in fetchBook(): " + error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <Text
          style={{
            fontSize: FontSize.large,
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Searching
        </Text>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]}>
      {!searchSuccess && (
        <ScrollView
          style={{ paddingBottom: 140 }}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.homeHeader}>Get Recommendations</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formGenre}>
              <Text style={styles.formHeader}>
                Genre
                <Text style={styles.reqMark}>*</Text>
              </Text>
              <FlatList
                scrollEnabled={false}
                style={styles.genreInnerContainer}
                data={genreList}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={
                      item.selected ? styles.selectedBox : styles.unselectedBox
                    }
                    onPress={() => {
                      toggleGenre(item.id);
                    }}
                  >
                    <Text style={{ fontSize: FontSize.sub }}>{item.genre}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.formGenre}>
              <Text style={styles.formHeader}>Length</Text>
              <FlatList
                scrollEnabled={false}
                style={styles.genreInnerContainer}
                data={lengthList}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={
                      item.selected ? styles.selectedBox : styles.unselectedBox
                    }
                    onPress={() => {
                      toggleLength(item.id);
                    }}
                  >
                    <Text style={{ fontSize: FontSize.sub }}>
                      {item.length}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.formGenre}>
              <Text style={styles.formHeader}>Favorite Authors</Text>
              <TextInput
                style={styles.inputBox}
                multiline
                keyboardType="web-search"
                value={favAuthor}
                onChangeText={(text) => setFavAuthor(text)}
              />
            </View>

            <View style={styles.formGenre}>
              <Text style={styles.formHeader}>Favorite Books</Text>
              <TextInput
                style={styles.inputBox}
                multiline
                keyboardType="web-search"
                value={favBook}
                onChangeText={(text) => setFavBook(text)}
              />
            </View>

            <View style={styles.formGenre}>
              <Text style={styles.formHeader}>Keywords</Text>
              <Text style={{ fontSize: FontSize.sub }}>
                * Enter keywords to add to search prompt
              </Text>
              <TextInput
                style={styles.inputBox}
                multiline
                keyboardType="web-search"
                value={keywords}
                onChangeText={(text) => setKeyword(text)}
              />
            </View>

            {/* exclude books in bookshelf */}
            <View style={styles.btnOuterContainer}>
              <TouchableOpacity
                style={styles.btnInnerContainer}
                onPress={() => handleSearch()}
              >
                <View style={styles.btn}>
                  <Text>Search</Text>
                  <Feather name="search" size={15} style={{ paddingLeft: 3 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {searchSuccess && (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.homeHeader}>Search results</Text>
          </View>
          <View style={styles.resultContainer}>
            <FlatList
              data={searchRes}
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 20,
                alignSelf: "center",
                marginBottom: 30,
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Next book?",
                      "Add this book to your wishlist?",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            (setAddBookAuthor(item.author),
                              setAddBookTitle(item.bookTitle),
                              setAddBookVisible(true));
                          },
                        },
                        { text: "No" },
                      ],
                    )
                  }
                  style={{ marginBottom: 15 }}
                >
                  <View style={{ gap: 3 }}>
                    <Text style={{ fontWeight: "600" }}>
                      {index + 1}. {item.bookTitle}
                    </Text>
                    <Text style={{ fontSize: FontSize.sub }}>
                      Author: {item.author}
                    </Text>
                    <Text style={{ fontSize: FontSize.sub }}>
                      Genre: {item.genres}
                    </Text>
                    <Text style={{ fontSize: FontSize.sub }}>
                      Description: {item.details}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <View style={styles.listFooterContainer}>
                  <View style={styles.btnOuterContainer}>
                    <TouchableOpacity
                      style={styles.btnInnerContainer}
                      onPress={() => setSearchSuccess(false)}
                    >
                      <View style={styles.btn}>
                        <Feather name="search" style={styles.icon} size={12} />
                        <Text style={{ fontSize: FontSize.sub }}>
                          Search Again
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              }
            />
          </View>
        </View>
      )}

      {isAddBookVisible && (
        <Modal visible={isAddBookVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Close?", "Draft will not be saved.", [
                  { text: "Continue Editing", style: "cancel" },
                  {
                    text: "Close",
                    style: "destructive",
                    onPress: () => setAddBookVisible(false),
                  },
                ]);
              }}
              style={{ alignSelf: "flex-start", padding: 5 }}
            >
              <Ionicons name="close" size={20} style={styles.closeIcon} />
            </TouchableOpacity>
            <AddBook
              setAddBookVisible={setAddBookVisible}
              initAuthor={addBookAuthor}
              initTitle={addBookTitle}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default recommendation;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeHeader: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  formContainer: {
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 25,
  },
  formGenre: { marginVertical: 8 },
  reqMark: {
    fontSize: FontSize.sub,
    color: ColorPalette.warning,
  },
  formHeader: {
    fontWeight: "600",
  },
  genreInnerContainer: {
    marginTop: 5,
    paddingHorizontal: 5,
  },
  selectedBox: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: ColorPalette.blackOverlay,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 5,
    backgroundColor: ColorPalette.blackOverlay,
  },
  unselectedBox: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: ColorPalette.muted,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 5,
  },
  inputBox: {
    marginTop: 5,
    width: "100%",
    fontSize: FontSize.small,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 10,
  },

  btnOuterContainer: {
    alignSelf: "center",
  },

  btnInnerContainer: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
  },

  btn: { flexDirection: "row", alignSelf: "center" },

  //   search result flat list
  resultContainer: {
    paddingBottom: 120,
  },

  listFooterContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
  },
  icon: {
    paddingRight: 5,
  },

  //   AddBook modal
  closeIcon: {
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
});
