import {firebase} from '../../firebase/firebaseSetup'

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapterOnline = new FileSync("dbOnline.json");
const dbOnline = low(adapterOnline);

db = dbOnline.getState();

// BEGIN STORING IN FIREBASE REALTIME DATABASE
var rootRef = firebase.database().ref();
rootRef
  .child("iDevicesPastWeek")
  .set(db.iDevicesPastWeek)
  .then(() => {
    console.log("Wrote iDevicesPastWeek");
  });
rootRef
  .child("cronStatus")
  .push()
  .set({ timestamp: new Date().toString() })
  .then(() => {
    console.log("Wrote cronStatus");
  });
rootRef
  .child("globalStats")
  .set(db.globalStats)
  .then(() => {
    console.log("Wrote globalStats");
  });
rootRef
  .child("localStats")
  .set(db.localStats)
  .then(() => {
    console.log("Wrote localStats");
  });
