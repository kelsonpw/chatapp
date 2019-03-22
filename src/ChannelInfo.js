import React, { useContext } from 'react';

import useDoc from './useDoc';
import { ChannelContext } from './Channel';

const propTypes = {};

function ChannelInfo() {
  // context
  const channelId = useContext(ChannelContext);

  // state
  const channel = useDoc(`channels/${channelId}`);

  // render

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        <input className="TopicInput" defaultValue={channel && channel.topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
}

ChannelInfo.propTypes = propTypes;

export default ChannelInfo;
