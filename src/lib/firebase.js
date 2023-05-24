import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// initilize firebase
const app = initializeApp(/* my firebase config */)
export const db = getFirestore(app);
export const auth = getAuth(app);