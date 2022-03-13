import firebase from "firebase/app";
import "firebase/auth";
import database from "firebase/firebase-database";
// import { getDatabase } from "firebase/database";

import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyARQQbmnEnafE4f18XFr0S4qLFHyY7JqL4",
    authDomain: "react-smuk.firebaseapp.com",
    databaseURL: "https://react-smuk-default-rtdb.firebaseio.com",
    projectId: "react-smuk",
    storageBucket: "react-smuk.appspot.com",
    messagingSenderId: "1008162828450",
    appId: "1:1008162828450:web:01f8e0a668477fb2e367fb"
  };
  firebase.initializeApp(firebaseConfig);
  // const app = initializeApp(firebaseConfig);

// Get a reference to the database service
// export const db = getDatabase(app)
  const storage = firebase.storage();
  export const auth = firebase.auth;
  export const db = firebase.database();

  export {storage , firebase as default};