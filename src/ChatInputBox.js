import React, { useState } from 'react';
import { db } from './firebase';

function ChatInputBox() {
  const [text, setText] = useState('');

  function updateMessage(event) {
    setText(event.target.value);
  }

  function postMessage(event) {
    event.preventDefault();
    db.collection('channels')
      .doc('github')
      .collection('messages')
      .add({
        text,
        createdAt: new Date(),
      });
    setText('');
  }

  return (
    <form onSubmit={postMessage} className="ChatInputBox">
      <input
        className="ChatInput"
        placeholder="Message #general"
        value={text}
        onChange={updateMessage}
      />
    </form>
  );
}

export default ChatInputBox;
