# React Product Hunt Feed

[![Build Status](https://travis-ci.org/samouss/react-product-hunt-feed.svg?branch=master)](https://travis-ci.org/samouss/react-product-hunt-feed) [![dependencies Status](https://david-dm.org/samouss/react-product-hunt-feed/status.svg)](https://david-dm.org/samouss/react-product-hunt-feed) [![devDependencies Status](https://david-dm.org/samouss/react-product-hunt-feed/dev-status.svg)](https://david-dm.org/samouss/react-product-hunt-feed?type=dev)

Product Hunt feed build with React, Webpack 2, Babel, ESLint, Mocha, Chai, Sinon, Enzyme.

[Live exemple: product-hunt-feed.herokuapp.com](https://product-hunt-feed.herokuapp.com) (it's a free dyno so be patient for the boot time 🙂)

## Installation

Clone the repository and then run the following command:

```
npm install
```

Create a token on [Product Hunt API](https://api.producthunt.com/v1/docs).

## Run the application

For run the development application and launch a server in watch mode on `localhost:8080`:

```
PRODUCT_HUNT_TOKEN=yourSecretToken npm start:server

# and in other tab

npm start:client
```

For run the production application on `localhost:3000`:

```
PRODUCT_HUNT_TOKEN=yourSecretToken npm start
```

## Build the application

For build your application for production:

```
npm run build
```

## Run the test for your application

Your tests will be executed in single run mode:

```
npm test
```

For run in watch mode:

```
npm test:watch
```
