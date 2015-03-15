import async from "async";
import {Server} from "hapi";
import React from "react";
import Router from "react-router";
import ContextHelper from "./helpers/ContextHelper";
import routes from "./views/Routes";

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();

server.connection({
	port: process.env.PORT || 8000
});

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

	Router.run(routes, request.path, (Handler) => {
		/**
		 * Prepare a unique Server Context per request, and inject it.
		 */
		const serverContext = ContextHelper.getServerContext();
		serverContext.request = request;
		const ContextualHandler = ContextHelper.injectContext(Handler, serverContext);

		/**
		 * Fake-render the components without output so they can register context loaders.
		 */
		React.renderToString(<ContextualHandler />);
		const loaders = ContextHelper.getContextLoaders(serverContext);

		/**
		 * Wait for all the registered callbacks and render for real, but this time with data.
		 */
		async.parallel(loaders, (error, results) => {
			const rendered = React.renderToString(<ContextualHandler />);
			const contextData = JSON.stringify(serverContext.contextData);
			const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";

			const output =
				`<!doctype html>
				<html lang="en-us">
					<head>
						<meta charset="utf-8">
						<title>react-isomorphic-starterkit</title>
						<link rel="shortcut icon" href="/favicon.ico">
					</head>
					<body>
						<div id="react-root">${rendered}</div>
						<script>window.CONTEXT_DATA = ${contextData};</script>
						<script src="${webserver}/dist/client.js"></script>
					</body>
				</html>`;

			reply(output);
		});
	})
});

server.start();
