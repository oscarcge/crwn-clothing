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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName , email } = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log ('error creating user', error.message);
        }
    }

    return userRef;
} 

export const addCollectionsAndDocuments = async (CollectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(CollectionKey)
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection; 
        return accumulator;

    }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( {promt: 'select_account' });
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
