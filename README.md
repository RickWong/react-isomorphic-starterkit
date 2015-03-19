![screenshot](https://i.imgur.com/IoZYIwb.png?1)

# React Isomorphic Starterkit

Isomorphic starterkit with server-side React rendering using 
[npm](https://www.npmjs.com/), 
[supervisor](https://www.npmjs.com/package/supervisor), 
[webpack](https://webpack.github.io/), 
[webpack-dev-server](https://github.com/webpack/webpack-dev-server),
[hapi.js](http://www.hapijs.com/), 
[async](https://github.com/caolan/async), 
[babel.js](http://babeljs.io/), 
[react.js](https://facebook.github.io/react), 
[react-router](https://github.com/rackt/react-router), 
[react-hot-loader](https://gaearon.github.io/react-hot-loader), 
[react-async](https://github.com/andreypopp/react-async),
[react-a11y](https://github.com/rackt/react-a11y),
[react-inline-css](https://github.com/RickWong/react-inline-css)

## Features

- Fully automated with npm run scripts
- Supervisor with Hapi.js server
- Webpack for watch and production builds
- React.js + Router on the client and server
- React Hot Loader for instant client updates
- Babel.js automatically compiles ES6
- React-async to preload on server to client
- Style-component for quick in-component CSS
- Accessibility hints from react-a11y
- Shrinkwrapped npm dependencies

It just works out-of-the-box.

## Installation

	git clone https://github.com/RickWong/react-isomorphic-starterkit.git
	cd react-isomorphic-starterkit
	
	npm install -g supervisor webpack webpack-dev-server concurrently
	npm install
	npm run watch     # yes, one command for server and client development!
	
	# production 
	NODE_ENV=production npm run build  

## Usage

Run `npm run watch` in your terminal and play with `views/Main.jsx` to get a feel of
the server-side rendering and client-side hot updates.

## Community

Let's start one together! After you ★Star this project, follow me [@Rygu](https://twitter.com/rygu)
on Twitter.

## License

BSD 3-Clause license. Copyright © 2015, Rick Wong. All rights reserved.
