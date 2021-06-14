import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth;


// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
    db.useEmulator('localhost', 8080);
    auth().useEmulator('http://localhost:9099/');
}


export {
    db,
    googleAuthProvider,
    firebase,
};

