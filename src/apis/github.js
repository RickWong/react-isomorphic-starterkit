import fetch from "isomorphic-fetch";
import fetchPlus from "fetch-plus";
import plusJson from "fetch-plus-json";
import plusBearerauth from "fetch-plus-bearerauth";

const githubServerUrl = () => {
	if (__SERVER__) {
		return "https://api.github.com";
	}

	if (__CLIENT__) {
		const {protocol, hostname, port} = window.location;

		return `${protocol}//${hostname}:${port}/api/github`;
	}
};

module.exports = fetchPlus.connectEndpoint(
	githubServerUrl(),
	{},
	[plusJson()]
);
