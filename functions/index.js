const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = require('./routes/helloWorld');

exports.onUserStatusChange = require('./triggers/onUserStatusChange');
