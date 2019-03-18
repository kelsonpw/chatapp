import React from 'react';
import T from 'prop-types';

const propTypes = {
  channelId: T.string.isRequired,
};

function ChannelInfo({ channelId }) {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value="Awesome stuff" />
      </div>
      <div className="ChannelName">#general</div>
    </div>
  );
}

ChannelInfo.propTypes = propTypes;

export default ChannelInfo;
