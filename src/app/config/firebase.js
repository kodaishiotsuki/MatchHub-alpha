//v8
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMZBpaWx82DGDu6MrJfxWG45ohWaRJaTs",
  authDomain: "matchhub-af483.firebaseapp.com",
  projectId: "matchhub-af483",
  storageBucket: "matchhub-af483.appspot.com",
  messagingSenderId: "458263535246",
  appId: "1:458263535246:web:460d66a872d2ec03c0b3df",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
