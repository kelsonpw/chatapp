import React from 'react';
import T from 'prop-types';
import useCollection from './useCollection';
import MessageWithAvatar from './MessageWithAvatar';
import ChatScroller from './ChatScroller';
import isSameDay from 'date-fns/is_same_day';

const messagesPropTypes = {
  channelId: T.string.isRequired,
};

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');
  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showDate = shouldShowDay(prev, message);
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
    </ChatScroller>
  );
}

function shouldShowDay(prev, message) {
  // is first message
  const isFirst = !prev;
  if (isFirst) return true;
  // is first message of a new day
  const isNewDay = !isSameDay(
    prev.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );
  // is new day, show date, otherwise do not
  return isNewDay;
}

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

Messages.propTypes = messagesPropTypes;

export default Messages;
