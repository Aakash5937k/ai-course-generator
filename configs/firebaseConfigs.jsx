// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-946d3.firebaseapp.com",
  projectId: "ai-course-generator-946d3",
  storageBucket: "ai-course-generator-946d3.firebasestorage.app",
  messagingSenderId: "637361751685",
  appId: "1:637361751685:web:7e10196567916055264bec",
  measurementId: "G-G1ZPKBTKB8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
