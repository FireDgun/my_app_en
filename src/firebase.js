import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq7XrJi-tH7WBeUGqhwrWRHBjVO7FpHyI",
  authDomain: "seminareco-44857.firebaseapp.com",
  projectId: "seminareco-44857",
  storageBucket: "seminareco-44857.appspot.com",
  messagingSenderId: "337492347378",
  appId: "1:337492347378:web:314cf85c28b48ac39ac36b",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
