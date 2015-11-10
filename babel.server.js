require("babel-polyfill");

require("babel-core/register")({
	only: /src/,
	presets: ["es2015", "react", "stage-0"]
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== "production") {
	if (!require("piping")({hook: true, includeModules: false})) {
		return;
	}
}

try {
	require("./src/server");
}
catch (error) {
	console.error(error.stack);
}
