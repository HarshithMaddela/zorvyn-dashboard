import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getCards(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "cards"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addCard(uid, card) {
  await addDoc(collection(db, "users", uid, "cards"), card);
}

export async function updateCard(uid, cardId, data) {
  await updateDoc(doc(db, "users", uid, "cards", cardId), data);
}

export async function deleteCard(uid, cardId) {
  await deleteDoc(doc(db, "users", uid, "cards", cardId));
}
