import { userBook } from "@/constants/interface";
import { useState } from "react";
import { Alert } from "react-native";
import { handleChangeStatus } from "../bookshelf/bookServices";
import {
  handleStatsAfterReview,
  handleYearlyTotal,
} from "../profile/profileServices";
import { handleAddReview, handleUpdateDate } from "./cardServices";

const useReview = (
  uid: string | undefined,
  initialEdit: boolean,
  book: userBook | undefined,
  setModalVisible: (isEditVisible: boolean) => void,
) => {
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState(book?.review || "");
  const [newRating, setNewRating] = useState<number>(0);
  const [isEditable, setEditable] = useState(initialEdit);

  const review = async () => {
    initialEdit ? onReviewed() : editReview();
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

  // new review
  const onReviewed = async () => {
    if (!uid || book === undefined) return;

    try {
      setLoading(true);
      await handleAddReview(uid, book.docId, newReview, newRating);

      // book
      await handleChangeStatus(uid, book.docId, "finished");
      await handleUpdateDate(uid, book.docId);

      // update stats
      await handleStatsAfterReview(uid);
      await handleYearlyTotal(uid);
    } catch (error) {
      console.log("onReviewed: " + error);
      Alert.alert("Error", "Failed to save review. \n Please try again.");
    }

    setModalVisible(false);
  };

  const discard = () => {
    (setEditable(!isEditable),
      setNewReview(book?.review || ""),
      setNewRating(book?.rating || 0));
  };

  return {
    loading,
    newReview,
    setNewReview,
    setNewRating,
    isEditable,
    setEditable,
    review,
    discard,
  };
};

export default useReview;
