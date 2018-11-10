var isIphoneRegex = /(iphone)/i;
var isNotRegex = /(case)|(copy)|(crack)|(icloud)|(replica)|(wanted)|(broken)|(samsung)|(huawei)|(repair)/i;
var iphoneTypeRegex = /(iphone)\s?((se)|(5s)|(xs)|(x)|(5)|(6s)|(6)|(7)|(8))/i; // order matters because of lazy checking
var isPlusRegex = /(plus)|(\+)|(max)/i; // TODO: does not pickup plus models that have immediate words next to it ie: 6S+
var iphoneGBRegex = /(16|32|64|128|256|512)/i;

function parseAdsToIphones(allAds) {
  // This function assumes that ads have not yet been parsed.
  // Filter allAds for non-parsed ads before using this.
  let iphones = allAds.filter(
    iphone =>
      iphone.title.match(isIphoneRegex) && // This is an iphone ad
      !iphone.title.match(isNotRegex) &&
      !iphone.description.match(isNotRegex) && // This is Not one of those things
      iphone.description.length < 500 && // This is not a spam ad with an essay for description
      iphone.attributes.price > 50 // Everything under 50 is likely to be spam
  );

  let iphonesParsed = iphones.map(ad => {
    let size =
      ad.title.match(iphoneGBRegex) || ad.description.match(iphoneGBRegex);
    let type = ad.title.match(iphoneTypeRegex);
    let plus = ad.title.match(isPlusRegex);
    if (size) {
      ad.memSize = size[0].trim();
    }
    if (type) {
      ad.iphoneType = type[0]
        .toUpperCase()
        .replace("IPHONE", "")
        .trim();
      if (plus && !ad.iphoneType === "SE") {
        ad.iphoneType = ad.iphoneType.concat("+");
      }
    }
    return ad;
  });

  return iphonesParsed
}

module.exports = {
  parseAdsToIphones: parseAdsToIphones
}