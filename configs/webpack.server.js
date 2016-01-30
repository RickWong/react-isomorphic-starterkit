var webpack = require("webpack");
var path = require("path");
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});
var nodeModulesTransform = function(context, request, callback) {
  // search for a '/' indicating a nested module
  var slashIndex = request.indexOf("/");
  var rootModuleName;
  if (slashIndex == -1) {
    rootModuleName = request;
  } else {
    rootModuleName = request.substr(0, slashIndex);
  }

  // Match for root modules that are in our node_modules
  if (nodeModules.hasOwnProperty(rootModuleName)) {
    callback(null, "commonjs " + request);
  } else {
    callback();
  }
}

module.exports = {
	target:  "node",
	cache:   false,
	context: __dirname,
	debug:   false,
	devtool: "source-map",
	entry:   ["../src/server"],
	output:  {
		path:          path.join(__dirname, "../dist"),
		filename:      "server.js"
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}})
	],
	module:  {
		loaders: [
			{test: /\.json$/, loaders: ["json"]}
		],
		postLoaders: [
			{test: /\.js$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/}
		],
		noParse: /\.min\.js/
	},
	externals: nodeModulesTransform,
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"web_modules"
		],
		extensions: ["", ".json", ".js"]
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
};
