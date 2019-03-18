import React from 'react';
import T from 'prop-types';

import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';

const propTypes = {
  channelId: T.string,
  user: T.object.isRequired,
};

function Channel({ channelId, user }) {
  return (
    <div className="Channel">
      {channelId && (
        <div className="ChannelMain">
          <ChannelInfo />
          <Messages channelId={channelId} />
          <ChatInputBox channelId={channelId} user={user} />
        </div>
      )}
      <Members />
    </div>
  );
}

Channel.propTypes = propTypes;

export default Channel;
