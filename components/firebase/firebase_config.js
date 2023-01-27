// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBbOv2ydI4Hv1SRsWmR9a55JzNMxNswpk",
    authDomain: "freshlistweb.firebaseapp.com",
    projectId: "freshlistweb",
    storageBucket: "freshlistweb.appspot.com",
    messagingSenderId: "1039791659167",
    appId: "1:1039791659167:web:193a3aef5d842b2e7a2aaa",
    measurementId: "G-38WP8RZ81T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);