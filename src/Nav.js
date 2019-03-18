import React from 'react';
import T from 'prop-types';
import { Link } from '@reach/router';
import useCollection from './useCollection';
import firebase from './firebase';

const propTypes = {
  user: T.object.isRequired,
};

function Nav({ user }) {
  const channels = useCollection('channels');

  const handleSignout = () => firebase.auth().signOut();

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoUrl} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button onClick={handleSignout} className="text-button">
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}

Nav.propTypes = propTypes;

export default Nav;
