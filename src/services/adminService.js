import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getAllSupportRequests() {
  const q = query(
    collection(db, "supportRequests"),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

