import CoverImage from "@/components/CoverImage";
import { ColorPalette, FontSize } from "@/constants/constantValues";
import { auth } from "@/firebase";
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

import Loading from "@/components/Loading";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import MyButton from "@/components/MyButton";
import SmallModalCloseBtn from "@/components/SmallModalCloseBtn";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Review from "../home/components/Review";
import useDisplayBooks from "./useDisplayBooks";

// which bookshelf to display (all / wishlist / progress / finished)
type Props = {
  bookshelf: string;
  bookshelf2?: string;
};

const DisplayBooks = ({ bookshelf, bookshelf2 }: Props) => {
  const uid = auth.currentUser?.uid;

  const {
    book,
    list,
    loading,
    failed,
    isModalVisible,
    setisModalVisible,
    isReviewModalVisible,
    setReviewModalVisible,
    newPageCount,
    setNewPageCount,
    refreshing,
    bookSelected,
    firstRead,
    startBook,
    seeReview,
    refresh,
  } = useDisplayBooks(uid, bookshelf, bookshelf2);
  const navbarHeight = useBottomTabBarHeight();

  if (loading) {
    return <Loading />;
  }

  if (failed) {
    return <Text>Failed to display books</Text>;
  }

  return (
    <View style={styles.bkListContainer}>
      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <SmallModalCloseBtn setModalVisible={setisModalVisible} />

            <View>
              <Text style={styles.modalText}>Title: {book?.title}</Text>

              {book?.status === "wishlist" && (
                <View>
                  <View style={styles.pageCountContainer}>
                    <Text style={styles.modalText}>Page Count:</Text>
                    <TextInput
                      value={newPageCount}
                      onChangeText={(text) => setNewPageCount(text)}
                      keyboardType="numeric"
                      style={styles.pageCountInput}
                    />
                  </View>
                  <Text style={styles.modalSubtext}>
                    ＊Make sure the total pages are correct !
                  </Text>
                  <MyButton
                    onPressAction={() => firstRead(book)}
                    label="Start Reading"
                  />
                </View>
              )}

              {book?.status === "finished" && (
                <View>
                  <Text style={styles.modalText}>
                    Last Read: {book.lastRead}
                  </Text>
                  <MyButton
                    onPressAction={() => seeReview()}
                    label="See Review"
                  />

                  <MyButton
                    onPressAction={() => startBook(book)}
                    label="Read Again"
                  />
                </View>
              )}

              {book?.status === "progress" && (
                <View style={{ alignSelf: "center", marginTop: 15 }}>
                  <Text>Currently reading</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isReviewModalVisible} animationType="slide">
        <View style={styles.fullModalContainer}>
          <ModalCloseBtn
            setModalVisible={setReviewModalVisible}
            withAlert={false}
          />
          <Review
            book={book}
            setModalVisible={setReviewModalVisible}
            initial={false}
          />
        </View>
      </Modal>

      <FlatList
        style={{ flex: 1 }}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => refresh()}
            style={{ marginTop: 5 }}
          />
        }
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 25,
          marginBottom: 20,
        }}
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bkContainer}
            onPress={() => bookSelected(item)}
          >
            <CoverImage url={item.imageLink} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.noneContainer}>
            <Text style={styles.noneText}>Empty Bookshelf</Text>
          </View>
        }
      />
    </View>
  );
};

export default DisplayBooks;

const styles = StyleSheet.create({
  bkListContainer: {
    paddingTop: 15,
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },
  bkContainer: {
    width: 100,
    height: 150,
  },

  noneContainer: {
    alignSelf: "center",
    height: "100%",
    paddingTop: 50,
  },
  noneText: {
    fontSize: FontSize.large,
    fontWeight: "500",
  },

  // modal

  overlay: {
    backgroundColor: ColorPalette.blackOverlay,
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 20,
    width: "80%",
    marginHorizontal: "auto",
  },
  modalText: {
    marginBottom: 8,
    paddingLeft: 12,
  },
  modalSubtext: {
    alignSelf: "center",
    fontSize: 11,
    color: ColorPalette.warning,
    paddingTop: 5,
  },

  pageCountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  pageCountInput: {
    borderColor: ColorPalette.muted,
    borderBottomWidth: 0.5,
    paddingHorizontal: 8,
    paddingBottom: 1,
    marginLeft: 2,
  },

  reviewTitle: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
  },

  fullModalContainer: {
    backgroundColor: "white",
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
  refreshText: {
    color: ColorPalette.blue,
    alignSelf: "center",
    paddingTop: 5,
  },
});
