import React, { useEffect } from 'react';
import T from 'prop-types';

import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';
import { db } from './firebase';

const propTypes = {
  channelId: T.string,
  user: T.object.isRequired,
};

function Channel({ channelId, user }) {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    });
  }, [user, channelId]);

  return (
    <div className="Channel">
      {channelId && (
        <div className="ChannelMain">
          <ChannelInfo channelId={channelId} />
          <Messages channelId={channelId} />
          <ChatInputBox channelId={channelId} user={user} />
        </div>
      )}
      <Members channelId={channelId} />
    </div>
  );
}

Channel.propTypes = propTypes;

export default Channel;
