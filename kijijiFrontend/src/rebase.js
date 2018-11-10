import Rebase from "re-base";
var firebase = require("firebase/app");
require("firebase/database");

var app = firebase.initializeApp({
  apiKey: "AIzaSyASx9uZ_r00fYVN_vw2uqmWGWcoMBBfQQg",
  authDomain: "kijiji-75203.firebaseapp.com",
  databaseURL: "https://kijiji-75203.firebaseio.com",
  projectId: "kijiji-75203",
  storageBucket: "kijiji-75203.appspot.com",
  messagingSenderId: "746922909754"
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;
