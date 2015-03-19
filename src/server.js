import {Server} from "hapi";
import React from "react";
import ReactAsync from "react-async";
import Router from "react-router";
import routes from "views/Routes";

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();
server.connection({port: process.env.PORT || 8000});
server.start();

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method:  "*",
	path:    "/{params*}",
	handler: (request, reply) => {
		reply.file("static" + request.path);
	}
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
		return reply.continue();
	}

	Router.run(routes, request.path, (Handler, router) => {
		ReactAsync.renderToStringAsync(
			<Handler />,
			(error, reactString, reactData) => {
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

				const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";
				output = ReactAsync.injectIntoMarkup(output, reactData, [`${webserver}/dist/client.js`]);

				reply(output);
			}
		);
	})
});
