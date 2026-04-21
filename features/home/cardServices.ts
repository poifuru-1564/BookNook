import { db } from "@/firebase";
import {
  doc,
  getDoc,
  increment,
  Timestamp,
  updateDoc,
} from "@react-native-firebase/firestore";
import { handleIncStatsProgress } from "../profile/profileServices";

export const handleAddReview = async (
  uid: string,
  bookID: string,
  review: string,
  rating: number,
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
  try {
    const ref = doc(db, "users", uid, "bookshelf", bookID);
    await updateDoc(ref, {
      currentPage: 0,
      startedAt: Timestamp.now().toDate(),
      status: "progress",
    });

    await handleIncStatsProgress(uid);
  } catch (error) {
    console.log("Error handleStartBook(): " + error);
  }
};

export const handleUpdateProgress = async (
  uid: string,
  bookID: string,
  newPage: number,
) => {
  const ref = doc(db, "users", uid, "bookshelf", bookID);
  await updateDoc(ref, {
    currentPage: newPage,
    lastRead: Timestamp.now().toDate().toLocaleDateString("en-US"),
  });
};

export const handleUpdateDate = async (uid: string, bookID: string) => {
  const ref = doc(db, "users", uid, "bookshelf", bookID);
  await updateDoc(ref, {
    lastRead: Timestamp.now().toDate().toLocaleDateString("en-US"),
  });
};

// update stats after reading
export const handleUpdateReadingStats = async (
  uid: string,
  pagesRead: number,
) => {
  const ref = doc(db, "users", uid);
  const today = new Date();
  let d = today.getDay() - 1;
  if (d === -1) d = 6;

  const prev = await getDoc(ref);

  const lastRead = new Date(prev.data()?.lastReadDate);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const pages = pagesRead ? pagesRead : 0;

  const isYesterday = lastRead.toDateString() === yesterday.toDateString();
  const isToday = lastRead.toDateString() === today.toDateString();

  if (isToday) {
    await updateDoc(ref, {
      totalPages: increment(pages),
      lastReadDate: today.toISOString(),
      [`weeklyStats.${d}.hasRead`]: true,
      [`weeklyStats.${d}.numOfPages`]: increment(pages),
    });
  } else {
    await updateDoc(ref, {
      totalPages: increment(pages),
      streakCount: isYesterday ? increment(1) : 1,
      lastReadDate: today.toISOString(),
      [`weeklyStats.${d}.hasRead`]: true,
      [`weeklyStats.${d}.numOfPages`]: increment(pages),
    });
  }
};
