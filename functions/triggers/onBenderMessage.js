require('isomorphic-fetch');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = functions.config();

const db = admin.firestore();

const bot = {
  displayName: 'bender',
  photoUrl:
    'https://amp.businessinsider.com/images/59f35df4bcf93d1e008b512c-750-563.png',
  uid: 'bender',
  status: {
    lastChanged: new Date(),
    state: 'online',
  },
  channels: {
    general: true,
  },
};

db.collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true });

let cs = '';

function sendMessageToBot(message) {
  const url = `https://www.cleverbot.com/getreply?key=${
    config.iambender.key
  }&input=${encodeURIComponent(message)}&cs=${cs}`;
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      cs = json.cs;
      console.log('Heres json', json);
      return json.output;
    });
}

function sleep() {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 1800);
  });
}

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((doc, context) => {
    const message = doc.data();
    if (!message.text.startsWith('@bender')) {
      return;
    }
    return sleep().then(() => {
      sendMessageToBot(message.text.replace(/^@bender /, '')).then(
        botResponse => {
          return db.collection('channels/general/messages').add({
            text: botResponse,
            user: db.collection('users').doc('bender'),
            createdAt: new Date(),
          });
        }
      );
    });
  });