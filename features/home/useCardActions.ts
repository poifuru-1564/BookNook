import { userBook } from "@/constants/interface";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { handleUpdateProgress, handleUpdateReadingStats } from "./cardServices";

export type Items = {
  book: userBook;
  isBorrowed: boolean;
};

const useCardActions = (
  uid: string | undefined,
  getBookList: () => void,
  onBorrowed: (index: number) => void,
) => {
  const [endPage, setEndPage] = useState("");
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);
  const [isReturnVisible, setReturnVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isReviewVisible, setReviewVisible] = useState(false);
  const router = useRouter();

  const onReturned = async (item: Items) => {
    if (!uid || !selectedItem) return;
    try {
      if (endPage.trim().length === 0) {
        Alert.alert("Missing Input", "Please Enter the page you ended today. ");
        return;
      }

      const startPage =
        item.book.currentPage === undefined ? 0 : item.book.currentPage;

      const end = parseInt(endPage);

      if (startPage > end) {
        Alert.alert(
          "Invalid End page",
          `Ending page must be later than the starting page (p.${startPage})`,
        );
        return;
      }

      const pagesRead = end - startPage;

      await handleUpdateProgress(uid, selectedItem.book.docId, end);
      await handleUpdateReadingStats(uid, pagesRead);
      setReturnVisible(false);

      if (selectedIndex !== null) onBorrowed(selectedIndex);
      Alert.alert(
        "",
        `You read ${pagesRead} pages today. \n Keep up the progress!`,
        [
          {
            text: "Close",
            onPress: () => {
              if (end === item.book.pageCount) {
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
      await getBookList();
    } catch (error) {
      console.log("onReturned: " + error);
      Alert.alert("Error", "Failed to update page count. \n Please try again.");
    }
  };

  return {
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
  };
};

export default useCardActions;
