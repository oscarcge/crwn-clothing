import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';




const config = {
    apiKey: "AIzaSyDwloXvkI45cSmKTe22DPeFQOZ3qEzQzvk",
    authDomain: "crwn-db-b14d2.firebaseapp.com",
    databaseURL: "https://crwn-db-b14d2.firebaseio.com",
    projectId: "crwn-db-b14d2",
    storageBucket: "crwn-db-b14d2.appspot.com",
    messagingSenderId: "124224086522",
    appId: "1:124224086522:web:6142ec00d26d604aa00443"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( {promt: 'select_account' });
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase