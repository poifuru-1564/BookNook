import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import { doc, setDoc, Timestamp } from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    //google signin
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;
    if (!idToken) {
      throw new Error("Authentication Failed.");
    }

    //firebase
    const googleCredential = GoogleAuthProvider.credential(
      response.data?.idToken,
    );

    const user = await signInWithCredential(getAuth(), googleCredential);

    if (user.additionalUserInfo?.isNewUser) {
      const userid = user.user.uid;

      await handleNewUser(userid);
    }

    return user;
  } catch (error: any) {
    console.log("handleGoogleSignin: " + error);
  }
};

const handleNewUser = async (uid: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      finishedBooks: 0,
      totalPages: 0,
      booksInProgress: 0,
      dailyStatsReset: new Date().toISOString(),
      weeklyStats: {
        0: { hasRead: false, numOfPages: 0 },
        1: { hasRead: false, numOfPages: 0 },
        2: { hasRead: false, numOfPages: 0 },
        3: { hasRead: false, numOfPages: 0 },
        4: { hasRead: false, numOfPages: 0 },
        5: { hasRead: false, numOfPages: 0 },
        6: { hasRead: false, numOfPages: 0 },
      },
      lastReadDate: Timestamp.now().toDate().toLocaleDateString("en-US"),
      streakCount: 0,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const handleEmailSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const isVerified = userCredential.user.emailVerified;
    if (!isVerified) {
      await signOut(auth);
      throw new Error("Email not verified.");
    }
    return true;
  } catch (error: any) {
    if (error.code === "auth/invalid-credential") {
      throw new Error("Invalid Credentials");
    }
    console.log("handleEmailSignin: " + error);
    throw new Error("Failed to log in. Please try again. ");
  }
};

export const handleCreateAccount = async (email: string, password: string) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = credentials.user;
    await handleNewUser(user.uid);

    await sendEmailVerification(user);

    await signOut(auth);
    return true;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "Thiss email address is already in use by another account.",
      );
    } else throw new Error("Failed to create account");
  }
};

export const handleResetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error: any) {
    if (error.code === "auth/invalid-email") {
      throw new Error("Invalid Email");
    } else throw new Error("Failed to send reset email");
  }
};
