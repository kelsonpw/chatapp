import React from 'react';
import T from 'prop-types';
import useCollection from './useCollection';

const propTypes = {
  channelId: T.string.isRequired,
};
function Members({ channelId }) {
  const members = useCollection('users', null, {
    field: `channels.${channelId}`,
    operator: '==',
    value: true,
  });
  console.log(members);
  return (
    <div className="Members">
      <div>
        <div className="Member">
          <div className="MemberStatus offline" />
          Kelson Warner
        </div>
        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  );
}

Members.propTypes = propTypes;

export default Members;
