// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC6QJtq96N7_nd2OoQrgyO3TYxTHWRTYjE",
    authDomain: "foodies-cookbook.firebaseapp.com",
    projectId: "foodies-cookbook",
    storageBucket: "foodies-cookbook.appspot.com",
    messagingSenderId: "297975437718",
    appId: "1:297975437718:web:965d2c12b5f63eebeda5b7"
};
firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;