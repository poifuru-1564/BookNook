import { deleteUser, signOut } from "@react-native-firebase/auth";
import {
  doc,
  getDoc,
  increment,
  updateDoc,
} from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth, db } from "../../firebase";

// doc for current User
export const handleGetProfile = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};

export const handleGetUsername = async (uid: string) => {
  const doc = await handleGetProfile(uid);

  if (doc == null) return;

  return doc.username;
};

//   update username
export const handleUpdateUsername = async (
  uid: string,
  newUserName: string,
) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    username: newUserName,
  });
};
// delete account and all data associated to the user
export const handleDeleteAccount = async () => {
  const user = auth.currentUser;
  if (user != null) {
    deleteUser(user)
      .then(() => {
        alert("Account Deleted");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }
};

// sign Out
export const handleSignOut = async () => {
  try {
    const providerId = auth.currentUser?.providerId;
    if (providerId === "google.com") {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    // else {
    //   const response = await appleAuth.performRequest({
    //     requestedOperation: appleAuth.Operation.LOGOUT,
    //   });
    // }

    // logout from firebase
    await signOut(auth);
    alert("Successfully signed out. See you next time!");
  } catch (error: any) {
    alert("Error: " + error.message);
  }
};

// stats

export const handleUpdateStatsPages = async (
  uid: string,
  pagesRead: number,
) => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
      totalPages: increment(pagesRead),
    });
  } catch (error) {
    console.log("handleUpdateStatsPages: " + error);
  }
};

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
export const handleDecStatsProgress = async (uid: string) => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
      booksInProgress: increment(-1),
    });
  } catch (error) {
    console.log("handleUpdateStatsFinished: " + error);
  }
};

export const handleIncStatsFinished = async (uid: string) => {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
      finishedBooks: increment(1),
    });
  } catch (error) {
    console.log("handleUpdateStatsFinished: " + error);
  }
};
