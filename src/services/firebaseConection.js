import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyBCMk7zASw9OHmvTdthuEBryaGWCQSq9C8",
  authDomain: "tacticaldevelopersystem.firebaseapp.com",
  projectId: "tacticaldevelopersystem",
  storageBucket: "tacticaldevelopersystem.appspot.com",
  messagingSenderId: "572156454155",
  appId: "1:572156454155:web:58f8d0f18e65bf5e2cee0e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
