import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyBgCs-cvoWv7sIAtZ7jAYj5U6-yLMidLjY",
    authDomain: "clothing-db-bd744.firebaseapp.com",
    databaseURL: "https://clothing-db-bd744.firebaseio.com",
    projectId: "clothing-db-bd744",
    storageBucket: "clothing-db-bd744.appspot.com",
    messagingSenderId: "365740891721",
    appId: "1:365740891721:web:d75e4708a4283c793d2998",
    measurementId: "G-JH3Y9ZDDPN"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//for google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

//only has google signin popup
export const signInWithGoogle =() => auth.signInWithPopup(provider);

export default firebase;