// Cron should hit this function at x_mins to calculate updated stats

// First parse iphone ads to iphoneType & memSize
var dbSetup = require("./db/offline/offlineDBSetup");
var firebaseDB = require("./db/firebase/firebaseDB");
var db = dbSetup.db;
var parse = require("./stats/parse");

parseAllAdsToIphones(db);
let iphonesThisWeek = getIphonesPostedThisWeek(db);
let globalResp = getGlobalStatsWithIphonesThisWeekUpdated(iphonesThisWeek);
let globalStatThisWeek = globalResp.globalStatThisWeek;
iphonesThisWeek = globalResp.iphonesThisWeek;
iphonesThisWeek = updateLocationDelta(iphonesThisWeek);
let valueIphones = sortByDistAndGlobalMeanMinusPrice(iphonesThisWeek);
checkAdsOfflineStatus(valueIphones).then(valueIphones => {
  saveToOfflineDB(iphonesThisWeek, globalStatThisWeek, valueIphones);
  let valueIphonesOnline = valueIphones.filter(iphone => {
    return iphone.offline === false;
  });
  firebaseDB
    .writeToFirebaseDB(globalStatThisWeek, valueIphonesOnline)
    .then(() => {
      process.exit();
    });
});

function parseAllAdsToIphones(db) {
  // TODO: Avoid duplicate work. Only parse ads that haven't been parsed
  let parsedAds = parse.parseAdsToIphones(db.getState().allAds);
  db.set("iphones", parsedAds).write();
}

function getIphonesPostedThisWeek(db) {
  let weekAgo = new Date();
  weekAgo.setDate(new Date().getDate() - 7);
  let iphonesThisWeek = db.getState().iphones.filter(ad => {
    return new Date(ad.date) > weekAgo && ad.iphoneType && ad.memSize;
  });
  return iphonesThisWeek;
}

function getGlobalStatsWithIphonesThisWeekUpdated(iphonesThisWeek) {
  var globalStat = require("./stats/globalStat");
  let globalStatResp = globalStat.calculateGlobalStats(iphonesThisWeek);
  iphonesThisWeek = globalStatResp.updatedAds;
  let globalStatThisWeek = globalStatResp.globalStats;
  return { globalStatThisWeek, iphonesThisWeek };
}

function updateLocationDelta(iphonesThisWeek) {
  let myLocation = {
    latitude: 43.7771103,
    longitude: -79.4286265
  };

  iphonesThisWeek.forEach(ad => {
    let adLocation = ad.attributes.location;
    ad.dist = Math.hypot(
      adLocation.latitude - myLocation.latitude,
      adLocation.longitude - myLocation.longitude
    );
  });
  return iphonesThisWeek;
}
// Sort by distanceDelta & globalMeanMinusPrice
function sortByDistAndGlobalMeanMinusPrice(iphonesThisWeek) {
  let valueIphones = iphonesThisWeek
    .filter(ad => {
      return ad.globalMeanMinusAdPrice > 50;
    })
    .sort(function(a, b) {
      return a.dist - b.dist;
    });

  if (valueIphones.length > 100) {
    valueIphones = valueIphones.slice(0, 100);
  }
  return valueIphones;
}

async function checkAdsOfflineStatus(valueIphones) {
  const kijiji = require("kijiji-scraper");
  promises = [];
  valueIphones.forEach(valueIphone => {
    let promise = new kijiji.Ad(valueIphone.url)
      .scrape()
      .then(function() {
        valueIphone.offline = false;
        return valueIphone;
      })
      .catch(() => {
        valueIphone.offline = true;
        return valueIphone;
        console.error;
      });
    promises.push(promise);
  });

  return await Promise.all(promises);
}

function saveToOfflineDB(iphonesThisWeek, globalStatThisWeek, valueIphones) {
  valueIphones.forEach(ad => {
    // Next iteration will ensure offline status is updated for db branches "iphones", "iphonesThisWeek"
    db.get("allAds")
      .find({ url: ad.url })
      .assign({ offline: ad.offline })
      .write();
  });

  db.set("iphonesThisWeek", iphonesThisWeek).write();
  db.set("valueIphones", valueIphones).write();
  db.set("globalStatThisWeek", globalStatThisWeek).write();
}
