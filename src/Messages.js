import React from 'react';
import T from 'prop-types';
import useCollection from './useCollection';
import useDocument from './useDocument';

const messagesPropTypes = {
  channelId: T.string.isRequired,
};

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showDate = false;
        const showAvatar = !prev || prev.user.id !== message.user.id;
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

const messageWithAvatarPropTypes = {
  message: T.object.isRequired,
  showDate: T.bool.isRequired,
};

function MessageWithAvatar({ message, showDate }) {
  const author = useDocument(message.user.path);

  return (
    <div>
      {showDate && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author && `url(${author.photoUrl})`,
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{' '}
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

Messages.propTypes = messagesPropTypes;
MessageWithAvatar.propTypes = messageWithAvatarPropTypes;

export default Messages;
