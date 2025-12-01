import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxu0pomkKsLo7OhnTqN7AjpkOY-lgMvx4",
  authDomain: "world-registry-aba2c.firebaseapp.com",
  projectId: "world-registry-aba2c",
  storageBucket: "world-registry-aba2c.firebasestorage.app",
  messagingSenderId: "427609745092",
  appId: "1:427609745092:web:5d572cdc30e97b3a578b91",
  measurementId: "G-0143GYCKK4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
