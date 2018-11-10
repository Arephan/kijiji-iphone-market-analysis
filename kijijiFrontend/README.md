# Kijiji Iphone Market Analysis Frontend

Displays value iphones based on stats calculated from backend module.

## Getting Started

This module retreives data from firebase realtime db. Please init firebase at the root directory.

### Prerequisites

Init firebase project [here](https://console.firebase.google.com/).

Make sure [firebase-tools](https://www.npmjs.com/package/firebase-tools)
is installed globally
```
npm i -g firebase-tools
```

Init firebase at root directory

```
firebase init
```

Config only hosting as follows:
```
=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

### Installing

```
npm install ; npm run build; firebase serve
```
Visit http://localhost:5000 for dashboard

## Deployment

```
firebase deploy
```

## Built With

* [Material-Dashboard-React](https://github.com/creativetimofficial/material-dashboard-react) - Dashboard template made by [Creative Tim](https://github.com/creativetimofficial)
* [Firebase Realtime DB](https://firebase.google.com/docs/database/) - For online db management

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Creative Tim](https://github.com/creativetimofficial) - For the beautiful dashboard template
