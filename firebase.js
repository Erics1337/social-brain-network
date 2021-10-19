// Firebase v9.0 uses tree shaking to reduce bundle size.  This essentially 
// allows you to specify which functions you need

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYzJn0bz0GbLQzNWu84wZnejxA3FZuxsM",
  authDomain: "social-brain-network.firebaseapp.com",
  projectId: "social-brain-network",
  storageBucket: "social-brain-network.appspot.com",
  messagingSenderId: "42265920254",
  appId: "1:42265920254:web:b66e1b246bde18f7bd9baf",
  measurementId: "G-M4EK4MXEQK"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Get the length of the apps currently initialized
// if length of that is no, initialize a new app, otherwise use the app that is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize database and with helper functions
const db = getFirestore();
const storage = getStorage();
// const analytics = getAnalytics(app);

// Explicit export means we are exporting more than one thing
export { app, db, storage };


// Singleton pattern is utalized here so that when rendering server-side
// there is ensured to be only one instance of firebase initialized