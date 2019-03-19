import React from 'react';
import T from 'prop-types';
import useCollection from './useCollection';

const propTypes = {
  channelId: T.string.isRequired,
};

function Members({ channelId }) {
  const members = useCollection('users', null, [
    `channels.${channelId}`,
    '==',
    true,
  ]);

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
