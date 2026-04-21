import CoverImage from "@/components/CoverImage";
import Loading from "@/components/Loading";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import SmallModalCloseBtn from "@/components/SmallModalCloseBtn";
import { auth } from "@/firebase";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
import { styles } from "../homeStyles";
import useCardActions from "../useCardActions";
import useCardList from "../useCardList";
import Review from "./Review";

const Card = () => {
  const uid = auth.currentUser?.uid;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const { loading, setLoading, list, getBookList, onBorrowed } =
    useCardList(uid);
  const {
    onReturned,
    endPage,
    setEndPage,
    isReturnVisible,
    setReturnVisible,
    selectedItem,
    setSelectedItem,
    selectedIndex,
    setSelectedIndex,
    isReviewVisible,
    setReviewVisible,
  } = useCardActions(uid, getBookList, onBorrowed);

  const router = useRouter();

  const afterReview = async () => {
    if (selectedIndex !== null) onBorrowed(selectedIndex);
    getBookList();
    setLoading(false);

    if (list.length === 1) {
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

  const handleKeyboardShow: KeyboardEventListener = (event) => {
    setKeyboardHeight(event.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const handleKeyboardHide: KeyboardEventListener = (event) => {
    setKeyboardVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity onPress={() => getBookList()}>
            <EvilIcons
              name="refresh"
              size={28}
              color="black"
              style={styles.refreshText}
            />
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <View>
            <View style={styles.emptyMessage}>
              <Text style={styles.emptyMessageText}>
                Time to pick up a new book 📚
              </Text>
              <MaterialCommunityIcons name="arrow-top-right-thick" size={20} />
            </View>
          </View>
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
                              Current Page: {item.book.currentPage} /
                              {item.book.pageCount}
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
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      {/* return book modal */}
      <Modal visible={isReturnVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {selectedItem !== null && (
              <View>
                <SmallModalCloseBtn setModalVisible={setReturnVisible} />
                <View style={styles.returnContainer}>
                  <Text style={styles.modalHeader}>Return Book</Text>
                  <Text style={styles.modalText}>Current Page</Text>
                  <View style={styles.pageInputContainer}>
                    <TextInput
                      style={styles.pageInput}
                      keyboardType="numeric"
                      value={endPage}
                      onChangeText={(text) => setEndPage(text)}
                    />
                    <Text style={styles.pageInputText}>
                      / {selectedItem.book.pageCount}
                    </Text>
                  </View>

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
      <Modal
        visible={isReviewVisible}
        animationType="slide"
        transparent
        onDismiss={() => afterReview()}
      >
        <View style={styles.fullModalContainer}>
          <ModalCloseBtn setModalVisible={setReviewVisible} withAlert={true} />
          <Review
            book={selectedItem?.book}
            setModalVisible={setReviewVisible}
            initial={true}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Card;
