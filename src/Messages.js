import React, { useState, useEffect } from 'react';
import { db } from './firebase';

// useEffect(() => {
//   return db.collection('channels').onSnapshot(snapshot => {
//     const docs = [];
//     snapshot.forEach(doc => {
//       docs.push({
//         ...doc.data(),
//         id: doc.id,
//       });
//     });
//     setChannels(docs);
//   });
// }, []);

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    return db
      .collection('channels')
      .doc('github')
      .collection('messages')
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setMessages(docs);
      });
  }, []);
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        return index === 0 ? (
          <div>
            <div className="Day">
              <div className="DayLine" />
              <div className="DayText">12/6/2018</div>
              <div className="DayLine" />
            </div>
            <div className="Message with-avatar">
              <div className="Avatar" />
              <div className="Author">
                <div>
                  <span className="UserName">Kelson Warner </span>
                  <span className="TimeStamp">3:37 PM</span>
                </div>
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
