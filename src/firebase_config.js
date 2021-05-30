import firebase from "firebase";

// connect to Firebase Project
var firebaseConfig = {
    apiKey: "AIzaSyDNQ4aGY9idjNyFhcMLBGXsQAHPAeb8Arc",
    authDomain: "todolist-a.firebaseapp.com",
    projectId: "todolist-a",
    storageBucket: "todolist-a.appspot.com",
    messagingSenderId: "376428562370",
    appId: "1:376428562370:web:b32241fc5c61c9b0f7b85b"
};

firebase.initializeApp(firebaseConfig);

// to use firebase in other files in this folder (e.g. App.js) w/o having to connect to firestore again
const db = firebase.firestore();
export { db };
