import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import MyButton from "@/components/MyButton";
import { ColorPalette, FontSize } from "@/constants/constantValues";
import React from "react";
import {
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
import AddBook from "../components/AddBook";
import useRecommendation from "../hooks/useRecommendation";

const RecommendationScreen = () => {
  const {
    toggleGenre,
    toggleLength,
    handleSearch,
    favAuthor,
    setFavAuthor,
    favBook,
    setFavBook,
    keywords,
    setKeyword,
    searchRes,
    searchSuccess,
    setSearchSuccess,
    loading,
    isAddBookVisible,
    setAddBookVisible,
    addBookAuthor,
    setAddBookAuthor,
    addBookTitle,
    setAddBookTitle,
    genreList,
    lengthList,
  } = useRecommendation();

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView edges={["top"]}>
      {!searchSuccess && (
        <ScrollView
          style={{ paddingBottom: 140 }}
          automaticallyAdjustKeyboardInsets={true}
        >
          <Header label="Get Recommendations" />

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

            <View style={{ width: "60%", alignSelf: "center" }}>
              <MyButton onPressAction={() => handleSearch()} label="Search" />
            </View>
          </View>
        </ScrollView>
      )}

      {searchSuccess && (
        <View>
          <Header label="Search Results" />
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
                  <MyButton
                    onPressAction={() => setSearchSuccess(false)}
                    label="Search Again"
                  />
                </View>
              }
            />
          </View>
        </View>
      )}

      {isAddBookVisible && (
        <Modal visible={isAddBookVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <ModalCloseBtn
              setModalVisible={setAddBookVisible}
              withAlert={true}
            />
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

export default RecommendationScreen;

const styles = StyleSheet.create({
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
