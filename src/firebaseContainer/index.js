// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDd2tvO0QC-cPrWGrKBfLnA34cDALIt3QA",
    authDomain: "fir-92a78.firebaseapp.com",
    projectId: "fir-92a78",
    storageBucket: "fir-92a78.appspot.com",
    messagingSenderId: "17823084879",
    appId: "1:17823084879:web:832ffbc8abdb0821d6953a",
    measurementId: "G-1JMR9R66RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export { storage };