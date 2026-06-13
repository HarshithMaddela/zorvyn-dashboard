import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function createNotification(uid, message, type = "info") {
  await addDoc(collection(db, "users", uid, "notifications"), {
    message,
    type,
    createdAt: serverTimestamp(),
    read: false,
  });
}

export async function getNotifications(uid) {
  const q = query(
    collection(db, "users", uid, "notifications"),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
