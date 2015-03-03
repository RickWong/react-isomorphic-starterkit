const webpack = require("webpack");
const path = require("path");

module.exports = {
	target:  "node",
	cache:   false,
	context: __dirname,
	devtool: "hidden-source-map",
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
			{include: /\.css$/, loaders: ["style", "css"]},
			{include: /\.json?$/, loaders: ["json"]},
			{include: /\.jsx?$/, loaders: ["babel-loader", "jsx?harmony"], exclude: /node_modules/}
		]
	},
	resolve: {
		extensions: ["", ".jsx", ".js"]
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
};
