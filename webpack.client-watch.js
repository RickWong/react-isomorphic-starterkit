var webpack = require("webpack");
var config = require("./webpack.client.js");

config.cache = true;
config.debug = true;
config.devtool = "eval";

config.entry.unshift(
	"webpack-dev-server/client?http://localhost:8080",
	"webpack/hot/only-dev-server"
);

config.output.publicPath = "http://localhost:8080/dist/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

config.module = {
	loaders: [
		{include: /\.json$/, loaders: ["json-loader"]},
		{include: /\.js$/, loaders: ["react-hot", "babel-loader?experimental&optional=runtime"], exclude: /node_modules/}
	]
};

config.devServer = {
	publicPath:  "http://localhost:8080/dist/",
	contentBase: "./static",
	hot:         true,
	inline:      true,
	quiet:       true,
	noInfo:      true,
	headers:     {"Access-Control-Allow-Origin": "*"},
	stats:       {colors: true}
};

module.exports = config;
