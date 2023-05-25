import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBVkclc0iDNlXNofTQ5BUGo8nf3WLSmFj8",
    authDomain: "importanttasks-d3ae3.firebase.com",
    projectId: "importanttasks-d3ae3",
    storageBucket: "importanttasks-d3ae3.appspot.com",
    messagingSenderId: "177480032051",
    appId: "1:177480032051:web:8da793eeaa1e03f1b1a846",
    measurementId: "G-4C4EJS1XQ5"
};

// initilize firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);