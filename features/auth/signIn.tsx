import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import firestore, {
  addDoc,
  collection,
} from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// import {
//   appleAuth,
//   AppleButton,
// } from "@invertase/react-native-apple-authentication";

const handleGoogleSignIn = async () => {
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
    if ((await user).additionalUserInfo?.isNewUser) {
      const userid = (await user).user.uid;
      try {
        const db = firestore();
        await addDoc(collection(db, "users", userid), {
          username: "guest",
          finishedBooks: 0,
          totalPages: 0,
          booksInProgress: 0,
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }

    return user;
  } catch (error: any) {
    alert("Error: " + error.message + ". Please try again.");
  }
};

// const handleAppleSignIn = async () => {
//   try {
//     const response = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
//     });

//     if (!response.identityToken) {
//       throw new Error("Authentication Failed.");
//     }

//     //firebase
//     const { identityToken, nonce } = response;
//     const appleCredential = AppleAuthProvider.credential(
//       identityToken,
//       nonce,
//     );

//     return signInWithCredential(getAuth(), appleCredential);
//   } catch (error) {}
// };

export default handleGoogleSignIn;
