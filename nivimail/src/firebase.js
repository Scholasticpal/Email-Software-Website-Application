// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO_Xvwm1pp8EOqA1WWL4I0tFWUWbrKTZ8",
  authDomain: "nivimail-7b7f2.firebaseapp.com",
  projectId: "nivimail-7b7f2",
  storageBucket: "nivimail-7b7f2.appspot.com",
  messagingSenderId: "6865563024",
  appId: "1:6865563024:web:2c9a3d5146924cc3091715",
  measurementId: "G-767E0JB7TF"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

const db = app.firestore()

export {auth, provider}
export default db