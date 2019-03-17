import React from 'react';
import { db } from './firebase';

function ChatInputBox() {
  function postMessage(event) {
    event.preventDefault();
    const [input] = event.target.elements;
    db.collection('channels')
      .doc('github')
      .collection('messages')
      .add({
        text: input.value,
        createdAt: new Date(),
      });
    input.value = '';
  }
  return (
    <form onSubmit={postMessage} className="ChatInputBox">
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}

export default ChatInputBox;
