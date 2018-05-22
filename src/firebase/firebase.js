//import * as firebase from 'firebase';
const firebase = window.firebase;
const prodConfig = {
    apiKey: "AIzaSyDOjzVyyk9-R7N_GG56V50G3eaKGcadPr8",
    authDomain: "test2-6bf20.firebaseapp.com",
    databaseURL: "https://test2-6bf20.firebaseio.com",
    projectId: "test2-6bf20",
    storageBucket: "test2-6bf20.appspot.com",
    messagingSenderId: "528310423620"
  };

const devConfig = {
        apiKey: "AIzaSyDOjzVyyk9-R7N_GG56V50G3eaKGcadPr8",
        authDomain: "test2-6bf20.firebaseapp.com",
        databaseURL: "https://test2-6bf20.firebaseio.com",
        projectId: "test2-6bf20",
        storageBucket: "test2-6bf20.appspot.com",
        messagingSenderId: "528310423620"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const utils = firebase.database;
export {
  db,
  auth, utils
};