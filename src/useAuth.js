import { useState, useEffect } from 'react';

import firebase, { db } from './firebase';

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
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
