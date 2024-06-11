// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-15175.firebaseapp.com",
  projectId: "mern-estate-15175",
  storageBucket: "mern-estate-15175.appspot.com",
  messagingSenderId: "328905305781",
  appId: "1:328905305781:web:63b498ad2a14075c51d8fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);