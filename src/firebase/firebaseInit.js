import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2vzTfoTdFxX6riu792mqbTEAu1NBPu1c",
  authDomain: "personal-blog-1b16f.firebaseapp.com",
  projectId: "personal-blog-1b16f",
  storageBucket: "personal-blog-1b16f.appspot.com",
  messagingSenderId: "238055556364",
  appId: "1:238055556364:web:4ffd0d8aeae0ee31993529",
  measurementId: "G-VBHMHXGJE3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }

export default app.firestore()
