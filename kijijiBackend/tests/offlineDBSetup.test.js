var dbSetup = require('../db/offline/offlineDBSetup')

test("branch iphone exists", () => {
  expect(dbSetup.db.getState().hasOwnProperty('iphones')).toBe(true);
});

test("branch allAds exists", () => {
  expect(dbSetup.db.getState().hasOwnProperty('allAds')).toBe(true);
});

test("branch cronStatus exists", () => {
  expect(dbSetup.db.getState().hasOwnProperty('cronStatus')).toBe(true);
});