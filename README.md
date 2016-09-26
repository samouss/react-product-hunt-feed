# React Product Hunt Feed

[![Build Status](https://travis-ci.org/samouss/react-product-hunt-feed.svg?branch=master)](https://travis-ci.org/samouss/react-product-hunt-feed) [![dependencies Status](https://david-dm.org/samouss/react-product-hunt-feed/status.svg)](https://david-dm.org/samouss/react-product-hunt-feed) [![devDependencies Status](https://david-dm.org/samouss/react-product-hunt-feed/dev-status.svg)](https://david-dm.org/samouss/react-product-hunt-feed?type=dev)

Product Hunt feed build with React, Webpack, Babel, ESLint, Mocha, Chai, Sinon, Enzyme.

![Product Hunt Feed](https://raw.githubusercontent.com/samouss/react-product-hunt-feed/master/example.png)

## Installation

Clone the repository and then run the following command:

```
npm install
```

Create the `config.json` file from `config.json.dist` then create a [Product Hunt API token](https://api.producthunt.com/v1/docs).

## Run the application

For build the dev application and launch a server in watch mode on `localhost:8080`:

```
npm start
```

## Bundle the application

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
