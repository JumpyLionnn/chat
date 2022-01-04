// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'; // no compat for new SDK
import { getFirestore, collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhGh6fIQ5lurA4lfaSBTUjMXr-1sQruW0",
  authDomain: "chat-aaf86.firebaseapp.com",
  projectId: "chat-aaf86",
  storageBucket: "chat-aaf86.appspot.com",
  messagingSenderId: "279715531550",
  appId: "1:279715531550:web:7194c8b28093f2fdbbd70f",
  measurementId: "G-9G8DPZ5LX1"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getFirestore(firebase);

export {database, collection, setDoc, doc, onSnapshot};