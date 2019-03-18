import React from 'react';
import T from 'prop-types';

import useDoc from './useDoc';

const propTypes = {
  channelId: T.string.isRequired,
};

function ChannelInfo({ channelId }) {
  const channel = useDoc(`channels/${channelId}`);
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
