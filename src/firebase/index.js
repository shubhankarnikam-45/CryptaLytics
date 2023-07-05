// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAzgjVXq8DMClZi2mcpnVCZG_xY7y6biRY",
    authDomain: "crypto-419cd.firebaseapp.com",
    projectId: "crypto-419cd",
    storageBucket: "crypto-419cd.appspot.com",
    messagingSenderId: "111412676863",
    appId: "1:111412676863:web:dc8fca8651eb4f316624ca",
    measurementId: "G-T6XD9J403D"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//connecting the firebase to the react application.

const firebaseApp = firebase.initializeApp(firebaseConfig);

//for authentication and database.
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };