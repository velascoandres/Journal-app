import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBN61uiF_SYaFus_n-W1OBjG3VHWuIW5Ow",
    authDomain: "journal-app-42a81.firebaseapp.com",
    projectId: "journal-app-42a81",
    storageBucket: "journal-app-42a81.appspot.com",
    messagingSenderId: "445334129248",
    appId: "1:445334129248:web:6111f03ebc82efaa6f9105",
    measurementId: "G-6L06W5CYF1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export  {
    db,
    googleAuthProvider,
    firebase,
};

