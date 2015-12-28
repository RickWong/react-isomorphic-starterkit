require("babel-polyfill");

require("babel-core/register")({
	only: /src/,
	presets: ["es2015", "stage-0", "react"]
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__     = false;
global.__SERVER__     = true;
global.__PRODUCTION__ = process.env.NODE_ENV === "production";
global.__DEV__        = process.env.NODE_ENV !== "production";

if (process.env.NODE_ENV !== "production") {
	if (!require("piping")({hook: true, includeModules: false})) {
		return;
	}
}

try {
	require("./src/server");
}
catch (error) {
	console.error(error.stack || error);
}
