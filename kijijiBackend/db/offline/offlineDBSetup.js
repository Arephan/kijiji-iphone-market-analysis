const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
  iphones: [],  // parsed to iphones
  allAds: [],  // everything scraped including spams
  cronStatus: [],  // last updated, how many fetched
  iphonesThisWeek: [], // iphones this week calculated with global and local mean
  valueIphonesOnline: [],
  globalStatThisWeek: [],
}).write();

module.exports = {
  db: db
};
