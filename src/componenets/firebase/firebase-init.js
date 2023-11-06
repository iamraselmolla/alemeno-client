// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzdHTGsk_PqT_vHNG6ljs5AoY7n8ghDoQ",
    authDomain: "iamraselmolla-course-store.firebaseapp.com",
    projectId: "iamraselmolla-course-store",
    storageBucket: "iamraselmolla-course-store.appspot.com",
    messagingSenderId: "1037004220428",
    appId: "1:1037004220428:web:0c6a6215b12a0e5bd0e629"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;