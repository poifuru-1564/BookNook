import CoverImage from "@/components/CoverImage";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import { auth } from "@/firebase";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  handleChangeStatus,
  handleEditPageCount,
  handleGetBookshelf,
} from "./bookServices";

import { userBook } from "@/constants/interface";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { handleStartBook } from "../home/cardServices";
import Review from "../home/components/Review";

// which bookshelf to display (all / wishlist / progress / finished)
type Props = {
  bookshelf: string;
  bookshelf2?: string;
  // onPressFunction:  have to change onPress depending on the page
  // need to make the onpress modal to display different content
};

const DisplayBooks = ({ bookshelf, bookshelf2 }: Props) => {
  const uid = auth.currentUser?.uid;
  const [list, setList] = useState<userBook[]>([]); // cover image
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [failed, setFailed] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [newPageCount, setNewPageCount] = useState("");

  const [isModalVisible, setisModalVisible] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [book, setBook] = useState<userBook>();
  const [bookID, setBookID] = useState("");

  const router = useRouter();

  const getBookList = async () => {
    if (!uid) return;

    try {
      const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
        bookshelf2 === undefined
          ? await handleGetBookshelf(uid, bookshelf)
          : await handleGetBookshelf(uid, bookshelf, bookshelf2);

      let bklist: userBook[] = [];

      querySnapshot.forEach((doc) => {
        bklist.push({
          docId: doc.id,
          status: doc.data().status,
          imageLink: doc.data().imageLink,
          manual: doc.data().manual,
          title: doc.data().title,
          pageCount: doc.data().pageCount,
          review: doc.data().review,
          rating: doc.data().rating,
          lastRead: doc.data().lastRead,
        });
      });

      setList(bklist);
    } catch (error) {
      console.log("getBookList(): Error displaying Book covers" + error);
      setLoading(false);
      setFailed(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBookList();
  }, []);

  const bookSelected = (item: userBook) => {
    if (item === undefined) return;
    setBook(item);
    setBookID(item.docId);
    setisModalVisible(true);
  };

  const seeReview = () => {
    setisModalVisible(false);
    setReviewModalVisible(true);
  };

  // display book details
  // const onPressed = async (bk: userBook | undefined) => {
  //   if(bk === undefined) return;
  //   try {

  //     setStatus("");

  //     // finished books
  //   if (bk.status === "finished"){
  //     setStatus("finished");
  //     setisModalVisible(true);
  //     return;
  //   }

  //     // book detail from userBook
  //     if (bk.manual) {

  //       if (bk.status !== undefined) setStatus(bk.status);

  //       setisModalVisible(true);
  //       return;
  //     }

  //     const doc = await handleGetBook(bk.docId);
  //     if (doc === false) {
  //       Alert.alert("Error", "Failed to load book details");
  //       return;
  //     }
  //     const data = doc.data();

  //     if (data === undefined) {
  //       Alert.alert("Error", "Failed to load book details");
  //       return;
  //     }

  //     setBook(bk);
  //     setisModalVisible(true);
  //   } catch (error) {
  //     alert("Error onPressed(): " + error);
  //   }
  // };

  // change status to "progress"
  const onStartPressed = async (bk: userBook | undefined) => {
    if (!uid) return;
    if (bk === undefined) return;
    try {
      await handleChangeStatus(uid, bk.docId, "progress");
      await handleStartBook(uid, bk.docId);
      setisModalVisible(false);
      router.back();
    } catch (error) {
      console.log("onStartPressed: " + error);
    }
  };

  // change page count
  const changePageCount = async (
    newPage: string,
    book: userBook | undefined,
  ) => {
    if (!uid) return;
    if (book === undefined) return;
    try {
      await handleEditPageCount(uid, book.docId, newPage);
      setEditFormVisible(false);
      setEditFormVisible(false);
      await getBookList();
      Alert.alert("Success", "Total page count updated successfully.");
    } catch (error) {
      console.log("Error ChangePageCount: " + error);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (failed) {
    return <Text>Failed to display books</Text>;
  }

  if (list.length === 0) {
    let message = "Add books to your wishlist";
    if (bookshelf === "finished") {
      message = "No finished books";
    }

    if (bookshelf === "all") {
      message = "Start creating your own bookshelf!!";
    }

    return (
      <View style={styles.noneContainer}>
        <Text style={styles.noneText}>{message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.bkListContainer}>
      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setisModalVisible(false)}
              style={{ alignSelf: "flex-end" }}
            >
              <Ionicons name="close" size={20} />
            </TouchableOpacity>

            <Text style={styles.modalText}>Title: {book?.title}</Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modalText}>
                Page Count: {book?.pageCount}
              </Text>

              {book?.status !== "finished" && (
                <Text
                  onPress={() => setEditFormVisible(true)}
                  style={styles.modalSubtext}
                >
                  Edit
                </Text>
              )}
            </View>

            {editFormVisible && (
              <View style={styles.editFormContainer}>
                <TextInput
                  value={newPageCount}
                  onChangeText={(text) => setNewPageCount(text)}
                  keyboardType="numeric"
                  style={styles.editForm}
                />

                <Text
                  onPress={() => changePageCount(newPageCount, book)}
                  style={styles.modalSubtext}
                >
                  Update
                </Text>
              </View>
            )}

            {book?.status === "wishlist" && (
              <View style={styles.btnOuterContainer}>
                <TouchableOpacity
                  style={styles.btnInnerContainer}
                  onPress={() => onStartPressed(book)}
                >
                  <View style={styles.btn}>
                    <Text>Start reading </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {book?.status === "finished" && (
              <View>
                <Text style={styles.modalText}>Last Read: {book.lastRead}</Text>
                <View style={styles.btnOuterContainer}>
                  <TouchableOpacity
                    style={styles.btnInnerContainer}
                    onPress={() => seeReview()}
                  >
                    <View style={styles.btn}>
                      <Text>See review </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.btnOuterContainer}>
                  <TouchableOpacity
                    style={styles.btnInnerContainer}
                    onPress={() => onStartPressed(book)}
                  >
                    <View style={styles.btn}>
                      <Text>Read Again </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {book?.status === "progress" && (
              <View style={{ alignSelf: "center", marginTop: 15 }}>
                <Text>Currently reading</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={isReviewModalVisible} animationType="slide">
        <View style={styles.fullModalContainer}>
          <TouchableOpacity
            onPress={() => setReviewModalVisible(false)}
            style={{ alignSelf: "flex-start", padding: 5 }}
          >
            <Ionicons name="close" size={20} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
          <Review book={book} setModalVisible={setReviewModalVisible} />
        </View>
      </Modal>

      <FlatList
        numColumns={3}
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
      />
    </View>
  );
};

export default DisplayBooks;

const styles = StyleSheet.create({
  bkListContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  bkContainer: {
    width: 100,
    height: 150,
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

  // modal

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
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
    width: "70%",
    marginHorizontal: "auto",
  },
  modalText: {
    marginBottom: 3,
    paddingLeft: 5,
  },
  modalSubtext: {
    paddingLeft: 15,
    paddingTop: 1,
    fontSize: FontSize.sub,
    color: ColorPalette.blue,
  },

  editFormContainer: {
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 5,
  },

  editForm: {
    borderColor: ColorPalette.muted,
    borderBottomWidth: 0.5,
    width: 50,
    fontSize: FontSize.sub,
    paddingBottom: 2,
    paddingLeft: 3,
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
});
