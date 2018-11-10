# Kijiji Iphone Market Analysis Backend

Scrapes iphone ads from Kijiji.ca. Calculates iphones statistics based on model and memory type.

## Getting Started

There are 2 main components to this module. `scrape.js` and `refresh.js`. `scrape.js` scrapes using node module [kijiji-scraper](https://www.npmjs.com/package/kijiji-scraper), and `refresh.js` calculates stats based on scraped data. Both modules use [lowdb](https://www.npmjs.com/package/lowdb) to store data offline, and use [firebase realtime db](https://firebase.google.com/docs/database/) to communicate with frontend React module.

### Prerequisites

Init firebase project [here](https://console.firebase.google.com/).

Replace firebase configs under `db/firebase/firebaseSetup.js`

Make sure [firebase-tools](https://www.npmjs.com/package/firebase-tools)
is installed globally
```
npm i -g firebase-tools
```

Go to firebase directory and init firebase

```
cd db/firebase ; firebase init
```

Config only database as follows:
```
=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

i  .firebaserc already has a default project, skipping

=== Database Setup

Firebase Realtime Database Rules allow you to define how your data should be
structured and when your data can be read from and written to.

? What file should be used for Database Rules? database.rules.json
✔  Database Rules for  have been downloaded to database.rules.json.
Future modifications to database.rules.json will update Database Rules when you run
firebase deploy.

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...
i  Writing gitignore file to .gitignore...

✔  Firebase initialization complete!
```

### Installing

Install node modules first

```
npm install
```

Scrape Ads:

```
$ node scrape.js
{ timeStamp: 'Sat Nov 10 2018 12:25:21 GMT-0500 (EST)',
  new: 40,
  old: 0 }
```

Calculate Stats:
```
$ node refresh.js
[2018-11-10T17:26:44.038Z]  @firebase/database: FIREBASE WARNING: Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to onlyupdate some of the children.
[2018-11-10T17:26:44.053Z]  @firebase/database: FIREBASE WARNING: Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to onlyupdate some of the children.
updated globalStatThisWeek
updated valueIphonesOnline
updated cronStatus
```


## Running the tests

```
yarn test
```

Only existence of db branches are tested to prevent `refresh.js` from crashing. Extensive testing of actual calculation functions need to be done.

## Built With

* [Kijiji-Scraper](https://www.npmjs.com/package/kijiji-scraper) - Light Weight Kijiji Scraper for Node.js
* [LowDB](https://www.npmjs.com/package/lowdb) - For offline db management
* [Firebase Realtime DB](https://firebase.google.com/docs/database/) - For online db management

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Matt Penny](https://github.com/mwpenny) - For the amazing scraper
