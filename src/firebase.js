import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBFD9zOGFuTR5Qq0UOlr81gVPyvdumEvDk',
  authDomain: 'airheadio.firebaseapp.com',
  databaseURL: 'https://airheadio.firebaseio.com',
  projectId: 'airheadio',
  storageBucket: 'airheadio.appspot.com',
  messagingSenderId: '471992828967',
};

firebase.initializeApp(config);
const db = firebase.firestore();

export default firebase
export { db };
