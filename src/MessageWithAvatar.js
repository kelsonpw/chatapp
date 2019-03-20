import React from 'react';
import T from 'prop-types';
import useDocWithCache from './useDocWithCache';
import formatDate from 'date-fns/format';

const propTypes = {
  message: T.object.isRequired,
  showDate: T.bool.isRequired,
};

function MessageWithAvatar({ message, showDate }) {
  // state
  const author = useDocWithCache(message.user.path);

  // render
  return (
    <div>
      {showDate && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {formatDate(message.createdAt.seconds * 1000, 'MM/DD/YYYY')}
          </div>
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
            <span>
              {formatDate(message.createdAt.seconds * 1000, 'h:mm A')}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

MessageWithAvatar.propTypes = propTypes;

export default MessageWithAvatar;
