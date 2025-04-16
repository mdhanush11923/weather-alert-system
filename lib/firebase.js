// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL7Abbd9wEmFNmBHPwLdaxrhigorFfQcc",
  authDomain: "esp-counter-b853b.firebaseapp.com",
  databaseURL:
    "https://esp-counter-b853b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp-counter-b853b",
  storageBucket: "esp-counter-b853b.firebasestorage.app",
  messagingSenderId: "786607102315",
  appId: "1:786607102315:web:75b48497e203b875b8142e",
  measurementId: "G-J00G5X7KPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
