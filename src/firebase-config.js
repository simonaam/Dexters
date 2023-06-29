import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

/* Paste your firebase configuration here */
const firebaseConfig = {

    apiKey: "AIzaSyA3F9YGWDGZlfRl5lw-e2hMwvk2gilvks0",
    authDomain: "deliverio-cetvrtak20.firebaseapp.com",
    projectId: "deliverio-cetvrtak20",
    storageBucket: "deliverio-cetvrtak20.appspot.com",
    messagingSenderId: "795284456843",
    appId: "1:795284456843:web:628cd160ddd5874570db8e"
  
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
