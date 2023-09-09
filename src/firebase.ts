// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "helloworld-inbound.firebaseapp.com",
  projectId: "helloworld-inbound",
  storageBucket: "helloworld-inbound.appspot.com",
  messagingSenderId: "120757206583",
  appId: "1:120757206583:web:4fccfb85e3430f47a149b2",
  measurementId: "G-5XQFCVT302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);