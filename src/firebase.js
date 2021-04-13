import firebase from 'firebase/app'; // importando Firebase
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA5QFw4P5iGctUqYXdUuWVSyYqWnPSNCvI",
    authDomain: "svelte-crud-1feb6.firebaseapp.com",
    projectId: "svelte-crud-1feb6",
    storageBucket: "svelte-crud-1feb6.appspot.com",
    messagingSenderId: "356979661363",
    appId: "1:356979661363:web:5c4104d50fc21413bf2146"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();