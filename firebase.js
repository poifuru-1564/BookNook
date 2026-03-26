import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

export const db = getFirestore();
export const auth = getAuth();
