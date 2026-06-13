import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getTransactions(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "transactions"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addTransaction(uid, transaction) {
  await addDoc(collection(db, "users", uid, "transactions"), transaction);
}

export async function updateTransaction(uid, id, transaction) {
  await updateDoc(doc(db, "users", uid, "transactions", id), transaction);
}

export async function deleteTransaction(uid, id) {
  await deleteDoc(doc(db, "users", uid, "transactions", id));
}
