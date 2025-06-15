// services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2TdbAfCDBcvaeT_kG9I5zM8m1FMUsBrg",
  authDomain: "frulo-ccf37.firebaseapp.com",
  projectId: "frulo-ccf37",
  storageBucket: "frulo-ccf37.firebasestorage.app",
  messagingSenderId: "341968609556",
  appId: "1:341968609556:web:eb8691b612d2f8d7ed2201",
  measurementId: "G-8PCBBQY0DG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
