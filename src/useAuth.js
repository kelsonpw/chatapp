import { useState, useEffect } from 'react';

import firebase, { db, setupPresence } from './firebase';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const userData = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(userData);
        setupPresence(userData);
        db.collection('users')
          .doc(userData.uid)
          .set(userData, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
