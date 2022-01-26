// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkAPMTBCpOw2oN2tiX3ZTdxFz7LO7uoZE",
  authDomain: "social-media2-f9c3c.firebaseapp.com",
  projectId: "social-media2-f9c3c",
  storageBucket: "social-media2-f9c3c.appspot.com",
  messagingSenderId: "122435285036",
  appId: "1:122435285036:web:eb75e73e2fc52888972189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth()