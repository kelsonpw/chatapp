import { useState, useEffect } from 'react';

import firebase, { db, setupPresence } from './firebase';

const randomImg = `https://source.unsplash.com/random/200x200`;

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const userData = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL || randomImg,
          uid: firebaseUser.uid,
        };
        if (firebaseUser.isAnonymous) {
          userData.photoUrl = randomImg;
          userData.displayName = 'Anonymous Human';
        }
        db.collection('users')
          .doc(userData.uid)
          .set(userData);
        setUser(userData);
        setupPresence(userData);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
