import React, { useContext } from 'react';
import { Link } from '@reach/router';
import useCollection from '../hooks/useCollection';
import firebase from '../firebase';
import { UserContext } from '../App';

const propTypes = {};

function Nav() {
  // context
  const user = useContext(UserContext);

  //state
  const channels = useCollection('channels');

  // click handler
  const handleSignout = () => firebase.auth().signOut();

  // render
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
