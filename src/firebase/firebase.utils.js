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

//create user in firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //get snapshot
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const{displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
  
};

export const addCollectionAndDocs = async (
  collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

//for google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

//only has google signin popup
export const signInWithGoogle =() => auth.signInWithPopup(provider);

export default firebase;