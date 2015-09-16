![screenshot](https://i.imgur.com/uZSZ5Y4.png?1)

# React Isomorphic Starterkit

Isomorphic starterkit with server-side React rendering using 
[npm](https://www.npmjs.com/), 
[piping](https://github.com/mdlawson/piping), 
[webpack](https://webpack.github.io/), 
[webpack-dev-server](https://github.com/webpack/webpack-dev-server),
[hapi.js](http://www.hapijs.com/), 
[babel.js](http://babeljs.io/), 
[react.js](https://facebook.github.io/react), 
[react-router](https://github.com/rackt/react-router), 
[react-hot-loader](https://gaearon.github.io/react-hot-loader), 
[react-transmit](https://github.com/RickWong/react-transmit),
[react-inline-css](https://github.com/RickWong/react-inline-css)

## Features

- Fully automated toolchain with npm run scripts
- Hot reloading web server with piping and Hapi.js
- Webpack for watching and production builds
- React.js + React Router on the client and server
- React Hot Loader for instant client updates
- Babel.js automatically compiles ES2015 + ES7
- React Transmit to preload on server and hydrate client
- InlineCss-component for styling components

It just works out-of-the-box.

## Installation

Development

```bash
git clone https://github.com/RickWong/react-isomorphic-starterkit.git
cd react-isomorphic-starterkit
	
npm install
npm run watch     # Yes, ONE command for server AND client development!
```

Production

```bash
NODE_ENV=production npm run build
NODE_ENV=production npm run start  
```

## Usage

Run `npm run watch` in your terminal and play with `views/Main.js` to get a feel of
the server-side rendering and client-side hot updates.

## Community

Let's start one together! After you ★Star this project, follow [@Rygu](https://twitter.com/rygu)
on Twitter.

## License

BSD 3-Clause license. Copyright © 2015, Rick Wong. All rights reserved.
