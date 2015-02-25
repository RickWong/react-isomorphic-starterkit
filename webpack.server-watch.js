const webpack = require("webpack");
const config = require("./webpack.server.js");

config.cache = true;
config.debug = true;
config.devtool = "source-map";
config.plugins = [];

module.exports = config;
