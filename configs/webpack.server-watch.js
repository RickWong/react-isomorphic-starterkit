var webpack = require("webpack");
var config = require("./webpack.server.js");
var wds = {
	hostname: process.env.HOSTNAME || "localhost",
	port: 8080
};

config.cache = true;
config.debug = true;

config.entry.unshift(
	"webpack/hot/poll?1000"
);

config.output.publicPath = "http://" + wds.hostname + ":" + wds.port + "/dist";

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: false, __DEV__: true}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

module.exports = config;
