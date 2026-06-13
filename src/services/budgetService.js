import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getBudgets(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "budgets"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addBudget(uid, budget) {
  await addDoc(collection(db, "users", uid, "budgets"), budget);
}

export async function deleteBudget(uid, id) {
  await deleteDoc(doc(db, "users", uid, "budgets", id));
}
