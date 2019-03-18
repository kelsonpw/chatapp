import React from 'react';
import T from 'prop-types';
import useCollection from './useCollection';
import MessageWithAvatar from './MessageWithAvatar';

const messagesPropTypes = {
  channelId: T.string.isRequired,
};

function shouldShowAvatar(prev, message) {
  // is first message
  const isFirst = !prev;
  if (isFirst) return true;
  // is a different user than previous message
  const isDifferentUser = prev.user.id !== message.user.id;
  if (isDifferentUser) return true;
  // has been longer than 3 minutes since previous message
  const hasBeenThreeMinutes =
    message.createdAt.seconds - prev.createdAt.seconds > 180;
  if (hasBeenThreeMinutes) return true;
  // do not show avatar, same user and less than 3 minutes since previous
  return false;
}

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showDate = false;
        const showAvatar = shouldShowAvatar(prev, message);
        return showAvatar ? (
          <MessageWithAvatar
            key={message.id}
            message={message}
            showDate={showDate}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Messages.propTypes = messagesPropTypes;

export default Messages;
