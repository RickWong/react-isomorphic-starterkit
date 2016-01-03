var webpack = require("webpack");
var path = require("path");

module.exports = {
	target:  "web",
	cache:   false,
	context: __dirname,
	debug:   false,
	devtool: false,
	entry:   ["../src/client"],
	output:  {
		path:          path.join(__dirname, "../static/dist"),
		filename:      "client.js",
		chunkFilename: "[name].[id].js"
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
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
