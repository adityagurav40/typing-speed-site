import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVpFvlAzCYI6nAA6Zd5CjTRNUO8Fmlh1M",
    authDomain: "typing-test-website-accio.firebaseapp.com",
    projectId: "typing-test-website-accio",
    storageBucket: "typing-test-website-accio.appspot.com",
    messagingSenderId: "457802694061",
    appId: "1:457802694061:web:d53198bdd13dbf7f0d3524",
    measurementId: "G-0KQJKND3WB"
  };
//initialization of firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebaseApp.firestore();

  export{ auth, db};