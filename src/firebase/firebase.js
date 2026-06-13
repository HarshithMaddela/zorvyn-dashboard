import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5gKLhRVRqe4dQQQSKyTkih7gEYHwFmDA",
  authDomain: "finexa-dashboard.firebaseapp.com",
  projectId: "finexa-dashboard",
  storageBucket: "finexa-dashboard.firebasestorage.app",
  messagingSenderId: "556310219970",
  appId: "1:556310219970:web:d6729a0a9cd99ffe19ff5b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
