
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAHNnUH7vTDskLxzx6W2zDCOjObogXoSNU",
  authDomain: "artvista-a2087.firebaseapp.com",
  projectId: "artvista-a2087",
  storageBucket: "artvista-a2087.appspot.com",
  messagingSenderId: "373673312126",
  appId: "1:373673312126:web:c0531f0bc39c50cacb3d2f",
  measurementId: "G-1HC41LF9GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db=getFirestore(app);
export const storage = getStorage(app);

export default app;