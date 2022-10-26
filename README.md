## Red Light, Green Light!

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

### Red Light, Green Light! is a progressive mobile web app about the famous Squid Game challenges "red light, green light". The app doesn't require a server to work, nor it requires an internet conexion to work once it has started.

## Tech Stack

It's made entirely with Lit and deployed using Netlify. You can open the app clicking [here](https://statues-app.netlify.app/home). 

## Quickstart

To get started:

```bash
npm install
npm run start
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Details

The game has three views: `home`, `game` and `ranking`;
- `home`: It contains the form that allows to register (in case that the user doesn't exist) or to login into your account.
- `game`: It is the game itself. Once you click on "Start!" button, the icons start to change. You must click on "Left" and "Right" button alternatively to win points. If you click on one of those buttons twice or more, you'll loose one point each time. If you click on one of those buttons when the light is red, you'll loose all your points. If you wish to stop the game you just have to click on "Stop!" button.
- `ranking`: It shows a table with the existing players along with their high scores.

All the information is stored in the `localStorage` of the browser. 
