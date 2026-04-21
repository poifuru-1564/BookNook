import {
  doc,
  getDoc,
  increment,
  updateDoc,
} from "@react-native-firebase/firestore";
import { db } from "../../firebase";

// doc for current User
export const handleGetProfile = async (uid: string) => {
  try {
    const ref = doc(db, "users", uid);
    return await getDoc(ref);
  } catch (error) {
    console.log("handleGetProfile: " + error);
  }
};

// stats

// starting a book
export const handleIncStatsProgress = async (uid: string) => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
      booksInProgress: increment(1),
    });
  } catch (error) {
    console.log("handleUpdateStatsFinished: " + error);
  }
};

// after reviewing / dec progress, inc finished books
export const handleStatsAfterReview = async (uid: string) => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
      finishedBooks: increment(1),
      booksInProgress: increment(-1),
    });
  } catch (error) {
    console.log("handleStatsAfterReview: " + error);
  }
};

export const handleWeeklyReset = async (uid: string) => {
  try {
    const ref = doc(db, "users", uid);
    const document = await getDoc(ref);
    const data = document.data();

    const date = new Date();
    const today = date.getDay();

    today === 0
      ? date.setDate(date.getDate() - 6)
      : date.setDate(date.getDate() - (today - 1));

    date.setHours(0, 0, 0, 0);
    const lastReset = data?.weeklyStatsReset
      ? new Date(data.weeklyStatsReset)
      : null;
    if (lastReset !== null && lastReset >= date) return;

    await updateDoc(ref, {
      weeklyStatsReset: new Date().toISOString(),
      weeklyStats: {
        0: { hasRead: false, numOfPages: 0 },
        1: { hasRead: false, numOfPages: 0 },
        2: { hasRead: false, numOfPages: 0 },
        3: { hasRead: false, numOfPages: 0 },
        4: { hasRead: false, numOfPages: 0 },
        5: { hasRead: false, numOfPages: 0 },
        6: { hasRead: false, numOfPages: 0 },
      },
    });
  } catch (error) {
    console.log("handleWeeklyReset: ", error);
  }
};

export const handleYearlyGoal = async (uid: string, goal: number) => {
  try {
    const currYear = new Date().getFullYear();

    const ref = doc(db, "users", uid);
    const prev = await getDoc(ref);

    const fieldname = "yearStat" + currYear;

    const prevData = prev.data()?.[fieldname];

    // new field
    if (prevData === undefined) {
      await updateDoc(ref, {
        [fieldname]: { total: 0, goal: goal },
      });
    } else {
      await updateDoc(ref, {
        [`${fieldname}.goal`]: goal,
      });
    }
  } catch (error) {
    console.log("handleEditGoals: " + error);
  }
};

export const handleYearlyTotal = async (uid: string) => {
  try {
    const currYear = new Date().getFullYear();
    const fieldname = "yearStat" + currYear;
    console.log(fieldname);

    const ref = doc(db, "users", uid);
    const prev = await getDoc(ref);
    const prevData = prev.data()?.[fieldname];

    if (!prevData) {
      await updateDoc(ref, {
        [fieldname]: { total: 1 },
      });
    } else {
      await updateDoc(ref, {
        [`${fieldname}.total`]: increment(1),
      });
    }
  } catch (error) {
    console.log("handleYearlyTotal: " + error);
  }
};
