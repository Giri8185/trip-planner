import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYGaYJ53SpPgDsjmYOsm4qhIh2iiZEBf0",
  authDomain: "ai-trip-planner-web.firebaseapp.com",
  projectId: "ai-trip-planner-web",
  storageBucket: "ai-trip-planner-web.appspot.com",
  messagingSenderId: "417197951586",
  appId: "1:417197951586:web:cef5e63cf8c05e29e4df3b",
  measurementId: "G-XYH46F7KRF"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);