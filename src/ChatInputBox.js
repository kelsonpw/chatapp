import React, { useState } from 'react';
import { db } from './firebase';

function ChatInputBox({ channelId, user }) {
  const [text, setText] = useState('');

  const updateMessage = event => {
    setText(event.target.value);
  };

  const postMessage = event => {
    event.preventDefault();
    db.collection(`channels/${channelId}/messages`)
    .add({
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

export default ChatInputBox;
