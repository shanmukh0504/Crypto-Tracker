import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyA_c4PMKYbrIAiqIp1Yj0ty3Xye1R8KqC8",
  authDomain: "crypto-app-a69be.firebaseapp.com",
  projectId: "crypto-app-a69be",
  storageBucket: "crypto-app-a69be.appspot.com",
  messagingSenderId: "688928942361",
  appId: "1:688928942361:web:c465ae94a2eb15b508bd88",
  measurementId: "G-37YEWHX1E7"
};

// Initialize Firebase
const firebaseDB=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth=firebase.auth();

export {auth};
export default firebaseDB.database().ref();

