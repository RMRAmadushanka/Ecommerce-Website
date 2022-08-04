// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOABIsD73xDLWF4RU-JCQeJEsd8iJv3Oo",
  authDomain: "ecom-d16e3.firebaseapp.com",
  projectId: "ecom-d16e3",
  storageBucket: "ecom-d16e3.appspot.com",
  messagingSenderId: "1056418410596",
  appId: "1:1056418410596:web:9c93b5049fe7986ea22f71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleAuthProvider = new GoogleAuthProvider(app);
export const auth = getAuth(app);
