import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getSubscriptions(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "subscriptions"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addSubscription(uid, data) {
  await addDoc(collection(db, "users", uid, "subscriptions"), data);
}

export async function deleteSubscription(uid, id) {
  await deleteDoc(doc(db, "users", uid, "subscriptions", id));
}
