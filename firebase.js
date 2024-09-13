// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object (replace with your actual config)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt7kSmaKDIXCUP5R5npOuxozggps0YHHA",
  authDomain: "votecuzimnosy.firebaseapp.com",
  projectId: "votecuzimnosy",
  storageBucket: "votecuzimnosy.appspot.com",
  messagingSenderId: "810446154583",
  appId: "1:810446154583:web:f3b3cfed45d1305903ec12",
  measurementId: "G-E4L28TTSCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore reference
const db = getFirestore(app);

export { db };
