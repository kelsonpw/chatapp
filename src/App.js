import React, { createContext, useState } from 'react';
import { Router, Redirect } from '@reach/router';

import Nav from './Nav';
import Channel from './Channel';
import firebase from './firebase';
import useAuth from './useAuth';

export const UserContext = createContext();

function App() {
  const user = useAuth();

  return user ? (
    <UserContext.Provider value={user}>
      <div className="App">
        <Nav />
        <Router>
          <Channel path="channel/:channelId" />
          <Redirect from="/" to="channel/general" />
        </Router>
      </div>
    </UserContext.Provider>
  ) : (
    <Login />
  );
}

function Login() {
  // state
  const [authError, setAuthError] = useState(null);

  // click handlers
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  const handleAnonSignIn = async () => {
    try {
      await firebase.auth().signInAnonymously();
    } catch (error) {
      setAuthError(error);
    }
  };

  // render

  return (
    <div className="Login">
      <h1>Airhead.io</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      <button onClick={handleAnonSignIn}>Sign in anonymously</button>
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
