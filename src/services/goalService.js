import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getGoals(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "goals"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addGoal(uid, goal) {
  await addDoc(collection(db, "users", uid, "goals"), goal);
}

export async function updateGoal(uid, goalId, data) {
  await updateDoc(doc(db, "users", uid, "goals", goalId), data);
}

export async function deleteGoal(uid, goalId) {
  await deleteDoc(doc(db, "users", uid, "goals", goalId));
}
