import { db } from "../firebase/firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createSupportRequest(data) {
  return await addDoc(collection(db, "supportRequests"), {
    ...data,
    status: "open",
    createdAt: serverTimestamp(),
  });
}
