// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Loaded from .env
  authDomain: "thedevricardo-e8d7f.firebaseapp.com",
  projectId: "thedevricardo-e8d7f",
  storageBucket: "thedevricardo-e8d7f.firebasestorage.app",
  messagingSenderId: "454235317271",
  appId: "1:454235317271:web:67e4529e4adf37e5a26852",
  measurementId: "G-9SHQJH52V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db };