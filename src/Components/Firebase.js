import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "crypto-app-a69be.firebaseapp.com",
  projectId: "crypto-app-a69be",
  storageBucket: "crypto-app-a69be.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseDB=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth=firebase.auth();

export {auth};
export default firebaseDB.database().ref();

