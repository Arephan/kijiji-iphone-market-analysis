// FIREBASE SETUP
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyASx9uZ_r00fYVN_vw2uqmWGWcoMBBfQQg",
  authDomain: "kijiji-75203.firebaseapp.com",
  databaseURL: "https://kijiji-75203.firebaseio.com",
  projectId: "kijiji-75203",
  storageBucket: "kijiji-75203.appspot.com",
  messagingSenderId: "746922909754"
};
firebase.initializeApp(config);

module.exports ={ firebase: firebase}