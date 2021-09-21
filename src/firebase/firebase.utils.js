import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAwT0DMEdG2ugh00lsElJdrxmIyw5W9DmA",
  authDomain: "webshop-dbaf2.firebaseapp.com",
  databaseURL: "https://webshop-dbaf2.firebaseio.com",
  projectId: "webshop-dbaf2",
  storageBucket: "webshop-dbaf2.appspot.com",
  messagingSenderId: "787220599846",
  appId: "1:787220599846:web:b38c532c516d9c938d42e7",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};