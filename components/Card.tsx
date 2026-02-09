import { ColorPalette, FontSize } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OpenHalfModal from "./HalfModal";
import OpenModal from "./Modal";
import ReturnBook from "./ReturnBook";
import Review from "./Review";

const Card = () => {
  const [isReviewVisible, setReviewVisible] = useState(false);
  const onReviewClose = () => {
    setReviewVisible(false);
  };

  const [isReturnVisible, setReturnVisible] = useState(false);
  const onReturnClose = () => {
    setReturnVisible(false);
  };

  const [isBorrowed, setBorrow] = useState(false);
  const onBorrowed = () => {
    setBorrow(!isBorrowed);
  };

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.cardTabContainer}>
          <Text style={styles.cardCount}># 3</Text>
        </View>
        <View style={styles.cardMainContainer}>
          <View style={styles.cardBorder}></View>
          <Text style={styles.cardTitle}>
            Harry Potter and the Prisoner of Azkaban
          </Text>

          <View style={styles.doubleLine}></View>

          {/* isBorrowed =false */}
          <View
            style={isBorrowed ? { display: "none" } : { display: "contents" }}
          >
            <View style={styles.bkDetailContainer}>
              <Text style={styles.bkDetail}>Author: J.K. Rowling</Text>
            </View>
            <View style={styles.bkDetailContainer}>
              <Text style={styles.bkDetail}>Last Read: 4/4 </Text>
            </View>
            <View style={styles.bkDetailContainer}>
              <Text style={styles.bkDetail}>Current Page: / </Text>
            </View>
            <View style={styles.cardBtnContainer}>
              <TouchableOpacity style={styles.cardBtn}>
                <Text style={styles.cardBtnText} onPress={onBorrowed}>
                  Borrow
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*  */}
        </View>

        {/* while isBorrowed = true */}
        <View
          style={isBorrowed ? { display: "contents" } : { display: "none" }}
        >
          <View style={styles.cardMainContainer}>
            <View style={styles.bkDetailContainer}>
              <Text style={styles.bkDetail}>Author: J.K. Rowling</Text>
            </View>

            <View style={styles.cardBtnContainer}>
              {/* Return Btn */}
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => {
                  setReturnVisible(true);
                }}
              >
                <Text style={styles.cardBtnText}>Return</Text>
              </TouchableOpacity>
              <OpenHalfModal isVisible={isReturnVisible}>
                <ReturnBook onClose={onReturnClose} onBorrowed={onBorrowed} />
              </OpenHalfModal>

              {/* Review Btn */}
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => setReviewVisible(true)}
              >
                <Text style={styles.cardBtnText}>Review</Text>
              </TouchableOpacity>

              <OpenModal isVisible={isReviewVisible} onClose={onReviewClose}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Close?", "Draft will not be saved.", [
                        { text: "Continue Editing", style: "cancel" },
                        {
                          text: "Close",
                          style: "destructive",
                          onPress: onReviewClose,
                        },
                      ]);
                    }}
                  >
                    <Ionicons name="close" size={20} style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>
                <Review />
              </OpenModal>
            </View>
          </View>
        </View>
      </View>
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
  bkDetailContainer: {
    margin: 15,
    marginBottom: 5,
    borderBottomColor: ColorPalette.blue,
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingBottom: 1,
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
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 10,
    gap: 10,
  },
  cardBtn: {
    borderColor: ColorPalette.lightBlue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardBtnText: {
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    fontSize: FontSize.sub,
  },

  closeIcon: {
    paddingLeft: 18,
  },
});
