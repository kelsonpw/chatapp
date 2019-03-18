import { useState, useEffect } from 'react';

import firebase, { db, setupPresence } from './firebase';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(user);
        setupPresence(user);
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, [user, setUser, setupPresence]);
  return user;
}
