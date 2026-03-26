import { db } from "@/firebase";
import { doc, Timestamp, updateDoc } from "@react-native-firebase/firestore";
import { handleIncStatsProgress } from "../profile/services";

export const handleAddReview = async (
  uid: string,
  bookID: string,
  review: string,
  rating: string,
) => {
  try {
    const ref = doc(db, "users", uid, "bookshelf", bookID);
    await updateDoc(ref, {
      review: review,
      rating: rating,
    });
  } catch (error) {
    console.log("handleAddReview: " + error);
  }
};

export const handleStartBook = async (uid: string, bookID: string) => {
  // change books status to "progress"
  // increment booksInProgress field in users -> uid -> user's doc
  // set startedAt to today's date ( bookshelf -> book -> startedAt)

  try {
    const ref = doc(db, "users", uid, "bookshelf", bookID);
    await updateDoc(ref, {
      currentPage: 0,
      startedAt: Timestamp.now().toDate(),
    });

    await handleIncStatsProgress(uid);
  } catch (error) {
    console.log("Error handleStartBook(): " + error);
  }
};

export const handleUpdatePage = async (
  uid: string,
  bookID: string,
  newPage: string,
) => {
  // when returned
  // update currentPage to newPage ( bookshelf -> book -> currentPage)
  try {
    const ref = doc(db, "users", uid, "bookshelf", bookID);
    await updateDoc(ref, {
      currentPage: newPage,
    });
  } catch (error) {
    console.log("handleUpdatePage: " + error);
  }
};

export const handleUpdateDate = async (uid: string, bookID: string) => {
  try {
    const ref = doc(db, "users", uid, "bookshelf", bookID);
    await updateDoc(ref, {
      lastRead: Timestamp.now().toDate().toLocaleDateString("en-US"),
    });
  } catch (error) {
    console.log("handleUpdateDate: " + error);
  }
};
