// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1o-_6r4QComvOvRXbDxJuUAtF2IYCAno",
  authDomain: "vue-portfolio-c077e.firebaseapp.com",
  projectId: "vue-portfolio-c077e",
  storageBucket: "vue-portfolio-c077e.firebasestorage.app",
  messagingSenderId: "497793485445",
  appId: "1:497793485445:web:59a9d17759c46fa6c077ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };  