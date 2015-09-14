import {Server} from "hapi";
import h2o2 from "h2o2";
import inert from "inert";
import React from "react";
import ReactDOM from "react-dom/server";
import {RoutingContext, match} from "react-router";
import createLocation from "history/lib/createLocation";
import Transmit from "react-transmit";
import routes from "views/routes";
import url from "url";

var hostname = process.env.HOSTNAME || "localhost";

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();

server.connection({host: hostname, port: process.env.PORT || 8000});

server.register([
	h2o2,
    inert
], function (err) {
	if (err) {
		throw err;
	}

	server.start(function () {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
	});
});

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method:  "GET",
	path:    "/{params*}",
	handler: {
		file: (request) => "static" + request.path
	}
});

/**
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
	method: "GET",
	path: "/api/github/{path*}",
	handler: {
		proxy: {
			passThrough: true,
			mapUri (request, callback) {
				callback(null, url.format({
					protocol: "https",
					host:     "api.github.com",
					pathname: request.params.path,
					query:    request.query
				}));
			},
			onResponse (err, res, request, reply, settings, ttl) {
				reply(res);
			}
		}
	}
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
		return reply.continue();
	}

	let location = createLocation(request.path);

	match({routes, location}, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			reply.redirect(redirectLocation.pathname + redirectLocation.search)
		}
		else if (error || !renderProps) {
			reply.continue();
		}
		else {
			Transmit.renderToString(RoutingContext, renderProps).then(({reactString, reactData}) => {
				let output = (
					`<!doctype html>
					<html lang="en-us">
						<head>
							<meta charset="utf-8">
							<title>react-isomorphic-starterkit</title>
							<link rel="shortcut icon" href="/favicon.ico">
						</head>
						<body>
							<div id="react-root">${reactString}</div>
						</body>
					</html>`
				);

				const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
				output          = Transmit.injectIntoMarkup(output, reactData, [`${webserver}/dist/client.js`]);

				reply(output);
			}).catch((error) => {
				console.error(error);
			});
		}
	});
});
