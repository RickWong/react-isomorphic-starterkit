require("babel/register")({
	stage: 1
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (!require("piping")({hook: true})) {
	return;
}

require("./src/server");
