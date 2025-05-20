// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBecdWwvCvqJeD5UQoBl53Kjm7yurJV9zo",
  authDomain: "task-manager-86e79.firebaseapp.com",
  projectId: "task-manager-86e79",
  storageBucket: "task-manager-86e79.firebasestorage.app",
  messagingSenderId: "330843586678",
  appId: "1:330843586678:web:004cd09c07eaa6dd55df57",
  measurementId: "G-02GXX93GS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add and export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
