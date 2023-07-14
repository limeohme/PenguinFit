/* eslint-disable quotes */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGnPVnqMy7IotkYXFfejq1KODLFqCi68E",
  authDomain: "penguinfit-2dec7.firebaseapp.com",
  projectId: "penguinfit-2dec7",
  storageBucket: "penguinfit-2dec7.appspot.com",
  messagingSenderId: "647236300917",
  appId: "1:647236300917:web:e70a8f96af7e5ca61ec83c",
  databaseURL: "https://penguinfit-2dec7-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app); // addStorage