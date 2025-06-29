// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPPpZ0b0a4mzixM2ElKNKBiBlAjhz5G7g",
  authDomain: "clone-2fee6.firebaseapp.com",
  projectId: "clone-2fee6",
  storageBucket: "clone-2fee6.firebasestorage.app",
  messagingSenderId: "853183152726",
  appId: "1:853183152726:web:2444bf11f7d5631424f1f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const timestamp = serverTimestamp;
