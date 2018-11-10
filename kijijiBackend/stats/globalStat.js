var stats = require("stats-lite");

function calculateGlobalStats(ads) {
  // Sorts iphones db array into obj with iphoneTypes and memSize as keys
  function sortToObjWithTypeAndMemAsKeys(ads) {
    let iphonesSortedByTypeMem = {};
    ads.forEach(ad => {
      if (!iphonesSortedByTypeMem[ad.iphoneType]) {
        iphonesSortedByTypeMem[ad.iphoneType] = {};
      }
      if (!iphonesSortedByTypeMem[ad.iphoneType][ad.memSize]) {
        iphonesSortedByTypeMem[ad.iphoneType][ad.memSize] = [];
      }
      iphonesSortedByTypeMem[ad.iphoneType][ad.memSize].push(ad);
    });
    return iphonesSortedByTypeMem
  }

  let iphonesSortedByTypeMem = sortToObjWithTypeAndMemAsKeys(ads);
  let globalStats = [];
  let updatedAds = [];
  Object.keys(iphonesSortedByTypeMem).forEach(iphoneType => {
    Object.keys(iphonesSortedByTypeMem[iphoneType]).forEach(memSize => {
      let priceArray = iphonesSortedByTypeMem[iphoneType][memSize].map(
        iphoneAd => iphoneAd.attributes.price
      );
      let dataJSON = {
        iphoneType: iphoneType,
        memSize: memSize,
        mean: stats.mean(priceArray),
        mode: Array.from(stats.mode(priceArray)),
        median: stats.median(priceArray),
        std_dev: stats.stdev(priceArray),
        totalNum: priceArray.length
      };
      globalStats.push(dataJSON);

      // Calculate awayFromGlobalMean
      iphonesSortedByTypeMem[iphoneType][memSize].forEach(ad => {
        ad.globalMeanMinusAdPrice = dataJSON.mean - ad.attributes.price;
        updatedAds.push(ad);
      });
    });
  });
  return { globalStats, updatedAds };
}
module.exports = {
  calculateGlobalStats: calculateGlobalStats
};
