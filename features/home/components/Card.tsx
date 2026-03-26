import CoverImage from "@/components/CoverImage";
import KeyboardHideBtn from "@/components/KeyboardHideBtn";
import { userBook } from "@/constants/interface";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import {
  handleChangeStatus,
  handleEditPageCount,
  handleGetBookshelf,
} from "@/features/bookshelf/bookServices";
import {
  handleDecStatsProgress,
  handleIncStatsFinished,
  handleUpdateStatsPages,
} from "@/features/profile/services";
import { auth } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardEventListener,
  Modal,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import {
  handleAddReview,
  handleUpdateDate,
  handleUpdatePage,
} from "../cardServices";

type Items = {
  book: userBook;
  isBorrowed: boolean;
};

const Card = () => {
  const uid = auth.currentUser?.uid;
  const [isReviewVisible, setReviewVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [isReturnVisible, setReturnVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [newPageCount, setNewPageCount] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [list, setList] = useState<Items[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);
  const [endPage, setEndPage] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const router = useRouter();

  const onBorrowed = (index: number) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isBorrowed: !item.isBorrowed } : item,
      ),
    );
  };

  const ratingCompleted = (rating: string) => {
    setRating(rating);
  };

  const onReturned = async (item: Items) => {
    if (!uid) return;
    try {
      if (endPage.trim().length === 0) {
        Alert.alert("Missing Input", "Please Enter the page you ended today. ");
        return;
      }
      const startPage =
        item.book.currentPage === undefined ? "0" : item.book.currentPage;
      const pagesRead = parseInt(endPage) - parseInt(startPage);

      await handleUpdatePage(uid, item.book.docId, endPage);
      await handleUpdateDate(uid, item.book.docId);
      await handleUpdateStatsPages(uid, pagesRead);

      setReturnVisible(false);
      if (selectedIndex !== null) onBorrowed(selectedIndex);
      Alert.alert(
        "",
        `You read ${pagesRead} pages today. \n Keep up the progress!`,
        [
          {
            text: "Close",
            onPress: () => {
              if (endPage === item.book.pageCount) {
                Alert.alert(
                  "Congrats!",
                  "You've reached the final page! \n Add a review 💭",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Review",
                      onPress: () => {
                        setReturnVisible(false);
                        setReviewVisible(true);
                        setEndPage("");
                        return;
                      },
                    },
                  ],
                );
              } else {
                setEndPage("");
                return;
              }
            },
          },
        ],
      );
    } catch (error) {
      console.log("onReturned: " + error);
      Alert.alert("Error", "Failed to update page count. \n Please try again.");
    }
  };

  const onReviewed = async (item: Items) => {
    if (!uid) return;
    if (rating.length === 0) {
      Alert.alert("Missing Input", "Star rating is required.");
      setRating("");
      setReview("");
      return;
    }

    try {
      setLoading(true);

      if (
        item.book.pageCount !== undefined &&
        item.book.currentPage !== undefined
      ) {
        const pagesRead =
          parseInt(item.book.pageCount) - parseInt(item.book.currentPage);
        await handleUpdateStatsPages(uid, pagesRead);
      }
      // save review
      await handleAddReview(uid, item.book.docId, review, rating);

      await handleChangeStatus(uid, item.book.docId, "finished");
      await handleDecStatsProgress(uid);
      await handleIncStatsFinished(uid);

      await handleUpdateDate(uid, item.book.docId);
    } catch (error) {
      console.log("onReviewed: " + error);
      Alert.alert("Error", "Failed to save review. \n Please try again.");
    }
    setReviewVisible(false);
    setReturnVisible(false);
    if (selectedIndex !== null) onBorrowed(selectedIndex);
    setLoading(false);
    setRating("");
    setReview("");

    await getBookList();
    if (list.length === 0) {
      Alert.alert(
        "Nice work finishing!",
        "Keep the streak alive! \n Pick your next read 📚",
        [
          {
            text: "Choose",
            onPress: () => router.navigate("/(tabs)/home/startBook"),
          },
        ],
      );
    } else {
      Alert.alert("Review Saved", "Book complete. Nice work!");
    }
  };

  const getBookList = async () => {
    if (!uid) return;
    try {
      const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
        await handleGetBookshelf(uid, "progress");

      let bklist: Items[] = [];

      querySnapshot.forEach((doc) => {
        bklist.push({
          book: {
            docId: doc.id,
            title: doc.data().title,
            status: doc.data().status,
            imageLink: doc.data().imageLink,
            startedAt: doc.data().startedAt,
            currentPage: doc.data().currentPage,
            pageCount: doc.data().pageCount,
            lastRead: doc.data().lastRead,
          },
          isBorrowed: false,
        });
      });
      setList(bklist);
    } catch (error) {
      console.log("Error getBookList(): " + error);
      setLoading(false);
      setFailed(true);
    }

    setLoading(false);
  };
  useEffect(() => {
    getBookList();
  }, []);

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

  // change page count
  const changePageCount = async (newPage: string) => {
    if (!uid) return;
    try {
      if (selectedItem?.book.docId === undefined) {
        Alert.alert("", "Failed to change total pages. Please try again.");
        return;
      }

      await handleEditPageCount(uid, selectedItem?.book.docId, newPage);
      setEditFormVisible(false);

      Alert.alert("Success", "Total page count updated successfully.");
    } catch (error) {
      console.log("Error ChangePageCount: " + error);
    }
  };

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              setLoading(true);
              await getBookList();
              setLoading(false);
              setRefreshing(false);
            }}
          />
        }
        data={list}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <View style={styles.cardTabContainer}>
              <Text style={styles.cardCount}># {index + 1}</Text>
            </View>
            <View style={styles.cardMainContainer}>
              <View style={styles.cardBorder}></View>
              <Text style={styles.cardTitle}>{item.book.title}</Text>

              <View style={styles.doubleLine}></View>

              <View>
                <View style={styles.bkOuterContainer}>
                  <View style={styles.imgContainer}>
                    <CoverImage url={item.book.imageLink} />
                  </View>

                  <View style={styles.bkInnerContainer}>
                    {/* isBorrowed =false */}
                    {!item.isBorrowed && (
                      <View>
                        <View style={{ gap: 12, marginBottom: 15 }}>
                          <View style={styles.bkDetailContainer}>
                            <Text style={styles.bkDetail}>
                              Last Read: {item.book.lastRead}
                            </Text>
                          </View>
                          <View style={styles.bkDetailContainer}>
                            <Text style={styles.bkDetail}>
                              Current Page: {item.book.currentPage} /{" "}
                              {item.book.pageCount}
                            </Text>
                          </View>

                          <View style={styles.editPageContainer}>
                            <Text
                              onPress={() => {
                                (setEditFormVisible(true),
                                  setSelectedItem(item));
                              }}
                              style={styles.modalSubtext}
                            >
                              * Fix Total Pages
                            </Text>
                          </View>
                        </View>

                        <View style={styles.cardBtnContainer}>
                          <TouchableOpacity
                            style={styles.cardBtn}
                            onPress={() => {
                              onBorrowed(index);
                              setSelectedIndex(index);
                            }}
                          >
                            <Text style={styles.cardBtnText}>Borrow</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {/* while isBorrowed = true */}
                    {item.isBorrowed && (
                      <View style={styles.cardBtnContainer}>
                        {/* Return Btn */}
                        <TouchableOpacity
                          style={styles.cardBtn}
                          onPress={() => {
                            setSelectedItem(item);
                            setReturnVisible(true);
                          }}
                        >
                          <Text style={styles.cardBtnText}>Return</Text>
                        </TouchableOpacity>

                        {/* Review Btn */}

                        <TouchableOpacity
                          style={styles.cardBtn}
                          onPress={() => {
                            setReviewVisible(true);
                            setSelectedItem(item);
                          }}
                        >
                          <Text style={styles.cardBtnText}>Review</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      {/* edit total pages modal  */}
      <Modal visible={editFormVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.editFormContainer}>
              <TouchableOpacity
                onPress={() => setEditFormVisible(false)}
                style={{ alignSelf: "flex-end" }}
              >
                <Ionicons name="close" size={15} />
              </TouchableOpacity>

              <Text style={styles.modalHeader}>
                Enter the correct total pages
              </Text>

              <TextInput
                value={newPageCount}
                onChangeText={(text) => setNewPageCount(text)}
                keyboardType="numeric"
                style={styles.editForm}
              />

              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => changePageCount(newPageCount)}
              >
                <Text style={styles.cardBtnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* return book modal */}
      <Modal visible={isReturnVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {selectedItem !== null && (
              <View>
                <TouchableOpacity
                  onPress={() => setReturnVisible(false)}
                  style={{ alignSelf: "flex-end" }}
                >
                  <Ionicons name="close" size={20} />
                </TouchableOpacity>

                <View style={styles.returnContainer}>
                  <Text style={styles.modalHeader}>Return Book</Text>
                  <Text style={styles.modalText}>Current Page</Text>
                  <TextInput
                    style={styles.pageInput}
                    keyboardType="numeric"
                    value={endPage}
                    onChangeText={(text) => setEndPage(text)}
                  />

                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => onReturned(selectedItem)}
                  >
                    <Text style={styles.cardBtnText}>Return</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      {/* finished & review modal */}
      <Modal visible={isReviewVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {selectedItem !== null && (
              <View>
                <TouchableOpacity
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => {
                    Alert.alert("Close?", "Draft will not be saved.", [
                      {
                        text: "Continue Editing",
                        style: "cancel",
                      },
                      {
                        text: "Close",
                        style: "destructive",
                        onPress: () => setReviewVisible(false),
                      },
                    ]);
                  }}
                >
                  <Ionicons name="close" size={20} />
                </TouchableOpacity>
                <View style={styles.reviewContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 7,
                      alignItems: "baseline",
                    }}
                  >
                    <Text style={styles.modalHeader}>
                      {selectedItem.book.title}
                    </Text>
                    <Text style={styles.reviewModalPageText}>
                      ({selectedItem.book.pageCount} p)
                    </Text>
                  </View>

                  {/* star review */}
                  <View
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: ColorPalette.card,
                      marginBottom: 10,
                    }}
                  >
                    <Rating
                      type="star"
                      ratingBackgroundColor={ColorPalette.card}
                      startingValue={0}
                      imageSize={25}
                      ratingCount={10}
                      onFinishRating={ratingCompleted}
                    />
                  </View>

                  {/* comments */}
                  <TextInput
                    style={styles.reviewInput}
                    placeholder="Review ... "
                    multiline
                    numberOfLines={20}
                    value={review}
                    onChangeText={(text) => setReview(text)}
                  />

                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        color: ColorPalette.warning,
                        fontSize: FontSize.small,
                      }}
                    >
                      * Make sure the page count is correct before saving
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => onReviewed(selectedItem)}
                  >
                    <Text style={styles.cardBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>

        {isKeyboardVisible && (
          <KeyboardHideBtn keyboardHeight={keyboardHeight} />
        )}
      </Modal>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: "85%",
    marginBottom: 15,
    alignSelf: "center",
  },
  cardTabContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  cardCount: {
    fontSize: FontSize.sub,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    fontWeight: "500",

    color: ColorPalette.card,
    backgroundColor: ColorPalette.blue,
    width: 60,
    height: 25,
    paddingTop: 5,
    textAlign: "center",
    borderColor: ColorPalette.blue,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderTopWidth: 2,
  },
  cardBorder: {
    borderColor: ColorPalette.blue,
    borderStyle: "solid",
    borderTopWidth: 10,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  cardMainContainer: {
    backgroundColor: ColorPalette.card,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    shadowColor: "#4c4c3b",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: { width: 1, height: 4 },
  },
  cardTitle: {
    fontSize: FontSize.large,
    fontWeight: "700",
    padding: 10,
    textAlign: "left",
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
  },
  doubleLine: {
    borderTopColor: ColorPalette.blue,
    borderBottomColor: ColorPalette.blue,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: "solid",
    paddingTop: 5,
    borderWidth: 1.5,
    marginBottom: 5,
  },

  bkOuterContainer: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  bkInnerContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  bkDetailContainer: {
    borderBottomColor: ColorPalette.blue,
    borderStyle: "solid",
    paddingBottom: 2,
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 0,
  },
  bkDetail: {
    fontSize: FontSize.sub,
    fontWeight: "700",
    paddingLeft: 5,
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
  },
  cardBtnContainer: {
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },
  cardBtn: {
    borderColor: ColorPalette.lightBlue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 6,
    paddingBottom: 6,
    width: "40%",
    alignSelf: "center",
  },
  cardBtnText: {
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    fontSize: FontSize.sub,
    alignSelf: "center",
  },

  closeIcon: {
    paddingLeft: 18,
  },

  imgContainer: {
    width: 80,
    height: 120,
  },

  //return modal
  overlay: {
    backgroundColor: ColorPalette.blackOverlay,
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    borderRadius: 20,
    width: "75%",
    marginHorizontal: "auto",
  },
  returnContainer: { alignItems: "center" },

  modalHeader: {
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    marginBottom: 10,
    color: ColorPalette.blue,
  },

  pageInput: {
    borderColor: ColorPalette.text,
    borderBottomWidth: 0.5,
    padding: 5,
    width: 60,
    marginTop: 5,
    marginBottom: 15,
  },
  modalTextContainer: {
    gap: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  modalText: {
    fontSize: FontSize.sub,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
  },

  // review
  reviewContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  reviewInput: {
    height: 150,
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    padding: 9,
    fontSize: FontSize.sub,
    marginBottom: 20,
  },
  addBtn: {
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    paddingRight: 12,
    paddingLeft: 9,
    borderRadius: 5,
  },
  reviewModalPageText: {
    fontSize: FontSize.sub,
    color: ColorPalette.blue,
  },

  // edit page count

  editPageContainer: {
    alignSelf: "flex-end",
    gap: 0,
  },
  modalSubtext: {
    paddingRight: 15,
    fontSize: 10,
    color: ColorPalette.blue,
  },

  editFormContainer: {
    padding: 7,
    alignItems: "center",
  },

  editForm: {
    borderColor: ColorPalette.muted,
    borderBottomWidth: 0.5,
    width: 100,
    fontSize: FontSize.sub,
    paddingBottom: 2,
    paddingLeft: 3,
    marginBottom: 20,
    marginTop: 10,
  },

  btnOuterContainer: {
    width: "80%",
    alignSelf: "center",
  },

  btnInnerContainer: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    borderRadius: 5,
  },

  btn: { flexDirection: "row", alignSelf: "center" },
});
