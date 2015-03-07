var webpack = require("webpack");
var config = require("./webpack.server.js");

config.cache = true;
config.debug = true;
config.devtool = "source-map";

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true}),
	new webpack.DefinePlugin({"global.GENTLY": false})
];

module.exports = config;
