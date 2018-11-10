var firebaseSetup = require("./firebaseSetup");

// BEGIN STORING IN FIREBASE REALTIME DATABASE
async function writeToFirebaseDB(globalStatThisWeek, valueIphonesOnline) {
  var rootRef = firebaseSetup.firebase.database().ref();
  let p1 = rootRef
    .child("globalStatThisWeek")
    .update(globalStatThisWeek)
    .then(() => {
      console.log("updated globalStatThisWeek");
    })
    .catch(console.error);
  // TODO: update only what's neccessary
  let p2 = rootRef
    .child("valueIphonesOnline")
    .update(valueIphonesOnline)
    .then(() => {
      console.log("updated valueIphonesOnline");
    })
    .catch(console.error);
  let p3 = rootRef
    .child("cronStatus")
    .set({ lastRefreshed: new Date().toString() })
    .then(() => {
      console.log("updated cronStatus");
    })
    .catch(console.error);
  return await Promise.all([p1,p2,p3])
}

module.exports = {
  writeToFirebaseDB: writeToFirebaseDB
};
