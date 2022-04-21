import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'
let firebaseConfig = {
    apiKey: "AIzaSyAxTlouhMcIptzE9f2-nUDj7MMvbcSdQAw",
    authDomain: "lista-de-tarefas-5f0ce.firebaseapp.com",
    projectId: "lista-de-tarefas-5f0ce",
    storageBucket: "lista-de-tarefas-5f0ce.appspot.com",
    messagingSenderId: "4157883090",
    appId: "1:4157883090:web:d4ce67bce58f2b6595630b",
    measurementId: "G-162SVQQZX5"
  };


 firebase.initializeApp(firebaseConfig);

 var db = firebase.firestore();

  export default firebase;
