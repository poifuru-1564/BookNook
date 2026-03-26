import { userBook } from "@/constants/interface";
import { ColorPalette, FontSize } from "@/constants/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { auth } from "../../../firebase";
import { handleAddReview } from "../cardServices";

type Props = {
  book: userBook | undefined;
  setModalVisible: (isModalVisible: boolean) => void;
};

const Review = ({ book, setModalVisible }: Props) => {
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState(book?.review || "");
  const [newRating, setNewRating] = useState("");
  const [isEditable, setEditable] = useState(false);
  const uid = auth.currentUser?.uid;

  if (book === undefined) {
    setModalVisible(false);
    Alert.alert("Error", "Failed to fetch book detail. Please try again");
  }

  const ratingCompleted = (rating: string) => {
    setNewRating(rating);
  };

  const editReview = async () => {
    if (uid === undefined || book?.docId === undefined) return;
    setLoading(true);
    try {
      await handleAddReview(uid, book?.docId, newReview, newRating);
      setEditable(false);
      Alert.alert("", "Changes saved successfully");
    } catch (error) {
      Alert.alert("Failed to update review. Please try again.");
    }

    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book?.title}</Text>
      <View style={{ alignSelf: "center" }}>
        <Rating
          showRating={true}
          startingValue={book?.rating}
          readonly={!isEditable}
          ratingCount={10}
          imageSize={25}
          ratingTextColor={ColorPalette.text}
          style={styles.rating}
          onFinishRating={ratingCompleted}
        />
      </View>

      <View style={styles.reviewContainer}>
        <TextInput
          multiline
          defaultValue={book?.review}
          editable={isEditable}
          value={newReview}
          onChangeText={(text) => setNewReview(text)}
          style={{ paddingHorizontal: 15 }}
        />

        <TouchableOpacity>
          {!isEditable && (
            <MaterialIcons
              name="edit"
              size={FontSize.text}
              style={styles.editIcon}
              onPress={() => setEditable(true)}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          {isEditable && (
            <MaterialIcons
              name="cancel"
              size={FontSize.text}
              style={styles.editIcon}
              onPress={() =>
                Alert.alert("Discard Changes? ", "Changes will not be saved", [
                  { text: "Keep Editing", style: "cancel" },
                  {
                    text: "Discard Changes",
                    onPress: () => setEditable(!isEditable),
                  },
                ])
              }
            />
          )}
        </TouchableOpacity>
      </View>

      {isEditable && (
        <View style={styles.btnOuterContainer}>
          <TouchableOpacity
            style={styles.btnInnerContainer}
            onPress={() => editReview()}
          >
            <View style={styles.btn}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  reviewContainer: {
    paddingVertical: 5,
    borderWidth: 0.3,
    borderColor: ColorPalette.muted,
    width: "100%",
  },
  reviewContainerText: {
    marginBottom: 5,
  },
  editIcon: {
    color: ColorPalette.muted,
    alignSelf: "flex-end",
    paddingRight: 8,
    paddingBottom: 3,
  },
  rating: {
    marginBottom: 10,
    paddingVertical: 10,
  },

  // edit review
  // reviewInput: {
  //   width: "100%",
  //   height: 150,
  //   borderColor: ColorPalette.muted,
  //   borderStyle: "solid",
  //   borderWidth: 0.5,
  //   padding: 9,
  //   marginTop: 10,
  //   fontSize: 12,
  // },
  // addBtn: {
  //   marginTop: 10,
  //   borderStyle: "solid",
  //   borderWidth: 0.5,
  //   borderColor: ColorPalette.muted,
  //   padding: 7,
  //   paddingRight: 12,
  //   paddingLeft: 9,
  //   borderRadius: 5,
  // },

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
