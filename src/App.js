import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import useAuth from './useAuth';
import firebase, { db } from './firebase';

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel user={user} />
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const [authError, setAuthError] = useState(null);
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };
  return (
    <div className="Login">
      <h1>Airhead.io</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry there was a problem.</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again.</p>
        </div>
      )}
    </div>
  );
}

export default App;
