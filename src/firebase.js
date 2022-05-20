import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'apikey',
  authDomain: 'airheadio.firebaseapp.com',
  databaseURL: 'https://airheadio.firebaseio.com',
  projectId: 'airheadio',
  storageBucket: 'airheadio.appspot.com',
  messagingSenderId: '',
});
const db = firebase.firestore();
const rtdb = firebase.database();

const CTX = {
  isOfflineForRTDB: {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  },
  isOnlineForRTDB: {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  },
  isOfflineForFirestore: {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  },
  isOnlineForFirestore: {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  },
};

export function setupPresence(user) {
  // get realtime user data
  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  // get firestore user doc
  const userDoc = db.doc(`/users/${user.uid}`);

  // when connected take a snapshot
  rtdb.ref('.info/connected').on('value', async snapshot => {
    // return if no user value present in snapshot;
    if (!snapshot.val()) {
      // UPDATE TO OFFLINE.
      userDoc.update({
        status: CTX.isOfflineForFirestore,
      });
      return;
    }

    // await telling the realtime database what to it should do when user disconnects
    await rtdbRef.onDisconnect().set(CTX.isOfflineForRTDB);

    // tell realtime database that user is online
    rtdbRef.set(CTX.isOnlineForRTDB);
    // sync realtime database with firestore
    userDoc.update({
      status: CTX.isOnlineForFirestore,
    });
  });
}

export { db, firebase as default };
