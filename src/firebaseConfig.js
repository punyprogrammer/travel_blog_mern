import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDH3GAWUvmrvmdiKB0kcocl1NbeJ7g7o34",

  authDomain: "blog-img-f7237.firebaseapp.com",

  projectId: "blog-img-f7237",

  storageBucket: "blog-img-f7237.appspot.com",

  messagingSenderId: "803765632058",

  appId: "1:803765632058:web:3ee1eb3a02eb7708398903",
};

//inititialise firebase
firebase.initializeApp(firebaseConfig);
//initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
export { projectFirestore, projectAuth, projectStorage };
