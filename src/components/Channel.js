import React, { createContext, useContext, useEffect } from 'react';
import T from 'prop-types';

import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';
import { db } from '../firebase';
import { UserContext } from '../App';

const propTypes = {
  channelId: T.string,
};

export const ChannelContext = createContext();

function Channel({ channelId }) {
  // context
  const user = useContext(UserContext);

  // hooks / on mount
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true,
    });
  }, [user, channelId]);

  // render

  return (
    <ChannelContext.Provider value={channelId}>
      <div className="Channel">
        {channelId && (
          <div className="ChannelMain">
            <ChannelInfo />
            <Messages />
            <ChatInputBox />
          </div>
        )}
        <Members />
      </div>
    </ChannelContext.Provider>
  );
}

Channel.propTypes = propTypes;
export default Channel;
