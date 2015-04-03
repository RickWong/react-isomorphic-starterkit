if (!require("piping")()) {
	return;
}

require("babel/register")({
	stage: 1
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

require("./src/server");
