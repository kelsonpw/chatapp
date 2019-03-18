import React, { useState } from 'react';
import T from 'prop-types';

import { db } from './firebase';

const propTypes = {
  channelId: T.string.isRequired,
  user: T.object.isRequired,
};

function ChatInputBox({ channelId, user }) {
  const [text, setText] = useState('');

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

  return (
    <form onSubmit={postMessage} className="ChatInputBox">
      <input
        className="ChatInput"
        placeholder={`Message #${channelId}`}
        value={text}
        onChange={updateMessage}
      />
    </form>
  );
}

ChatInputBox.propTypes = propTypes;

export default ChatInputBox;
