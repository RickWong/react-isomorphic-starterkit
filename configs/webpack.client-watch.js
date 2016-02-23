var webpack = require("webpack");
var config = require("./webpack.client.js");
var wds = {
	hostname: process.env.HOSTNAME || "localhost",
	port: 8080
};

config.cache   = true;
config.debug   = true;
config.devtool = "cheap-module-eval-source-map";

config.entry.unshift(
	"webpack-dev-server/client?http://" + wds.hostname + ":" + wds.port,
	"webpack/hot/only-dev-server"
);

config.devServer = {
	publicPath: "http://" + wds.hostname + ":" + wds.port + "/dist",
	hot:        true,
	inline:     false,
	lazy:       false,
	quiet:      true,
	noInfo:     true,
	headers:    {"Access-Control-Allow-Origin": "*"},
	stats:      {colors: true},
	host:       wds.hostname
};

config.output.publicPath             = config.devServer.publicPath;
config.output.hotUpdateMainFilename  = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: false, __DEV__: true}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

config.module.postLoaders = [
	{test: /\.js$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&presets[]=react&presets[]=react-hmre"], exclude: /node_modules/}
];

module.exports = config;
