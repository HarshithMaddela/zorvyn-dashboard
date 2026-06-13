import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getProfile(uid) {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function updateProfile(uid, data) {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, data);
}
