// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APPID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
// };

// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr3iEcoduqDv0IW9czwmt3Yqp5StZED0w",
  authDomain: "nirvana-for-business.firebaseapp.com",
  projectId: "nirvana-for-business",
  storageBucket: "nirvana-for-business.appspot.com",
  messagingSenderId: "825654222284",
  appId: "1:825654222284:web:0778c8883de21917b51169",
  measurementId: "G-MB5G7G09MR",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log("initialized firebase");

// const analytics = getAnalytics(app);

// Initialize firestore persistence for data caching
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

setPersistence(getAuth(), browserSessionPersistence);
