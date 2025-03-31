// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7f08g1iLKGnDNvbZD10UWsjEC51jwQRs",
  authDomain: "interviewer-5f567.firebaseapp.com",
  projectId: "interviewer-5f567",
  storageBucket: "interviewer-5f567.firebasestorage.app",
  messagingSenderId: "1090434873314",
  appId: "1:1090434873314:web:d56b3632b0c47ecddc2bbb",
  measurementId: "G-5XF8EBH6E2"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);