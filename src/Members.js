import React, { useContext } from 'react';
import useCollection from './useCollection';
import { ChannelContext } from './Channel';

const propTypes = {};

function Members() {
  // context
  const channelId = useContext(ChannelContext);

  // state
  const members = useCollection('users', null, [
    `channels.${channelId}`,
    '==',
    true,
  ]);

  // render
  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map(member => (
          <div key={member.id} className="Member">
            <div
              className={`MemberStatus ${
                member.status ? member.status.state : 'offline'
              }`}
            />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

function sortByName(a, b) {
  return a.displayName > b.displayName
    ? 1
    : a.displayName < b.displayName
    ? -1
    : 0;
}

Members.propTypes = propTypes;

export default Members;
