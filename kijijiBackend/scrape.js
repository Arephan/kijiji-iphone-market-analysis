const dbSetup = require("./db/offline/offlineDBSetup");
const kijiji = require("kijiji-scraper");

let db = dbSetup.db;

// search options & param
let options = {
  minResults: 40
};
let params = {
  locationId: 0,
  categoryId: 0,
  sortByName: "dateDesc",
  keywords: "iphone"
};

// SCRAPER
kijiji
  .search(params, options)
  .then(function(ads) {
    let newAds = 0;
    let oldAds = 0;
    let allAds = db.get("allAds");

    ads.map(ad => {
      let dbAD = allAds.find({ url: ad.url }).value();
      if (dbAD) {
        oldAds++;
      } else {
        allAds.push(ad).write();
        newAds++;
      }
    });

    let timeStamp = {
      timeStamp: new Date().toString(),
      new: newAds,
      old: oldAds
    };

    db.get("cronStatus")
      .push(timeStamp)
      .write();

    console.log(timeStamp);

    process.exit();
  })
  .catch(console.error);
