import React, { useContext, useState } from 'react';
import T from 'prop-types';

import { db } from '../firebase';
import { ChannelContext } from './Channel';
import { UserContext } from '../App';

const propTypes = {};

function ChatInputBox() {
  // state
  const [text, setText] = useState('');

  // context
  const channelId = useContext(ChannelContext);
  const user = useContext(UserContext);

  // click handler methods/logic
  const updateMessage = event => {
    setText(event.target.value);
  };

  const postMessage = event => {
    event.preventDefault();
    db.collection(`channels/${channelId}/messages`).add({
      user: db.collection('users').doc(user.uid),
      text,
      createdAt: new Date(),
    });
    setText('');
  };

  // render
  return (
    <form onSubmit={postMessage} className="ChatInputBox">
      <input
        className="ChatInput"
        placeholder={`Message #${channelId}.  @bot to message BenderBot.  See what he has to say!`}
        value={text}
        onChange={updateMessage}
      />
    </form>
  );
}

ChatInputBox.propTypes = propTypes;

export default ChatInputBox;
