// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8GCwDXS9TKseHPplm0VN5GV67_85br-g",
  authDomain: "cuponera-dw2.firebaseapp.com",
  projectId: "cuponera-dw2",
  storageBucket: "cuponera-dw2.firebasestorage.app",
  messagingSenderId: "381550023973",
  appId: "1:381550023973:web:a625c28e7781a5dea076cc",
  measurementId: "G-Q8W5CYQLNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);