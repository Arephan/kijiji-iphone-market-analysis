//CHECK IF ONLINE
function isAdOffline(url) {
  let ad = new kijiji.Ad(url).scrape.then(function() {
    // Use the ad object
    console.log(ad.isScraped()); // true
    console.log(ad.title);
}).catch(return false)
  
}

module.exports = {
  isAdOffline: isAdOffline
}