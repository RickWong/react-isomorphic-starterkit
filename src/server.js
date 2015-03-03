const path = require("path");
const React = require("react");
const Router = require("react-router");
const {Server} = require("hapi");
const ltrim = require("./helpers/ltrim");
const routes = require("./views/Routes");

/**
 * Start Hapi server on port 8000.
 *
 * @type {Server}
 */
const server = new Server();

server.connection({
	port: 8000
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
		const component = React.renderToString(<Handler />);
		const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";
		const output = ltrim(
			`<!doctype html>
			<html lang="en-us">
				<head>
					<meta charset="utf-8">
					<title>react-isomorphic-starterkit</title>
					<link rel="shortcut icon" href="/favicon.ico">
				</head>
				<body>
					<div id="react-root">${component}</div>
					<script src="${webserver}/dist/client.js"></script>
				</body>
			</html>`
		);

		reply(output);
	})
});

server.start();
