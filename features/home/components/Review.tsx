import Loading from "@/components/Loading";
import { btnStyles } from "@/components/MyButton";
import { ColorPalette, FontSize } from "@/constants/constantValues";
import { userBook } from "@/constants/interface";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { auth } from "../../../firebase";
import useReview from "../useReview";

type Props = {
  book: userBook | undefined;
  setModalVisible: (isModalVisible: boolean) => void;
  initial: boolean;
};

const Review = ({ book, setModalVisible, initial }: Props) => {
  const uid = auth.currentUser?.uid;
  const {
    loading,
    newReview,
    setNewReview,
    setNewRating,
    isEditable,
    setEditable,
    review,
    discard,
  } = useReview(uid, initial, book, setModalVisible);

  useEffect(() => {
    if (book === undefined) {
      setModalVisible(false);
      Alert.alert("Error", "Failed to fetch book detail. Please try again");
    }
  }, [book]);

  if (loading) {
    return <Loading />;
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
          onFinishRating={(rating: number) => setNewRating(rating)}
        />
      </View>

      <View style={styles.reviewContainer}>
        <TextInput
          multiline
          defaultValue={book?.review}
          editable={isEditable}
          value={newReview}
          onChangeText={(text) => setNewReview(text)}
          style={styles.reviewTextInput}
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
      </View>

      {isEditable && (
        <View style={styles.btnContainer}>
          <View style={styles.btnOuterContainer}>
            <TouchableOpacity
              style={styles.btnRedInnerContainer}
              onPress={() =>
                Alert.alert("Discard Changes? ", "Changes will not be saved", [
                  { text: "Keep Editing", style: "cancel" },
                  {
                    text: "Discard Changes",
                    onPress: () => {
                      discard();
                    },
                  },
                ])
              }
            >
              <Text style={styles.btnRedText}>Discard Changes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnOuterContainer}>
            <TouchableOpacity
              style={btnStyles.btnInnerContainer}
              onPress={() => review()}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: FontSize.large,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  reviewContainer: {
    borderWidth: 0.3,
    borderColor: ColorPalette.muted,
    borderRadius: 5,
    width: "100%",
  },
  reviewContainerText: {
    marginBottom: 5,
  },
  editIcon: {
    color: ColorPalette.muted,
    alignSelf: "flex-end",
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 5,
  },
  rating: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  reviewTextInput: {
    padding: 10,
    lineHeight: 16,
    minHeight: 68,
  },

  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnOuterContainer: {
    width: "48%",
    alignSelf: "center",
  },

  btnText: {
    fontSize: FontSize.sub,
  },
  btnRedInnerContainer: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.warning,
    padding: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  btnRedText: {
    fontSize: FontSize.sub,
    color: ColorPalette.warning,
  },
});
