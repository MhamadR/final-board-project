// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlfJW2p9lVMhKIjco_7TTqnUXAF0NUTAI",
  authDomain: "planit-f778c.firebaseapp.com",
  projectId: "planit-f778c",
  storageBucket: "planit-f778c.appspot.com",
  messagingSenderId: "575208077078",
  appId: "1:575208077078:web:819cfb60846184ddf40237",
  measurementId: "G-L2MMQVS5SR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db;
