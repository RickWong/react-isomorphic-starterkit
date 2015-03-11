var webpack = require("webpack");
var path = require("path");

module.exports = {
	target:  "node",
	cache:   false,
	context: __dirname,
	devtool: false,
	entry:   ["./src/server"],
	output:  {
		path:     path.join(__dirname, "dist"),
		filename: "server.js"
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true}),
		new webpack.DefinePlugin({"global.GENTLY": false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
		new webpack.optimize.OccurenceOrderPlugin()
	],
	module:  {
		loaders: [
			{include: /\.json$/, loaders: ["json-loader"]},
			{include: /\.jsx$/, loaders: ["babel-loader"]},
			{include: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/}
		]
	},
	resolve: {
		extensions: ["", ".json", ".jsx", ".js"]
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
};
