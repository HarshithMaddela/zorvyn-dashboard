import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function createUserDocument(user) {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),

      bio: "",
      occupation: "",
      country: "",
      phone: "",
      currency: "INR",
    });
  }
}
