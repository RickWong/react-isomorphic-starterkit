import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaProxy from "koa-proxy";
import koaStatic from "koa-static";
import React from "react";
import ReactDOM from "react-dom/server";
import * as ReactRouter from "react-router";
import * as history from "history";
import Transmit from "react-transmit";

import githubApi from "apis/github";
import routesContainer from "containers/routes";

try {
	const app      = koa();
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 8000;
	let   routes   = routesContainer;

	app.use(koaStatic("static"));

	app.use(koaProxy({
		host: githubApi.url,
		match: /^\/api\/github\//i,
		map: (path) => path.replace(/^\/api\/github\//i, "/")
	}));

	app.use(function *(next) {
		yield ((callback) => {
			const webserver = __PRODUCTION__ ? "" : `//${this.hostname}:8080`;
			const location  = history.createLocation(this.path);

			ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
				if (redirectLocation) {
					this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
					return;
				}

				if (error || !renderProps) {
					callback(error);
					return;
				}

				Transmit.renderToString(ReactRouter.RoutingContext, renderProps).then(({reactString, reactData}) => {
					let template = (
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

					this.type = "text/html";
					this.body = Transmit.injectIntoMarkup(template, reactData, [`${webserver}/dist/client.js`]);

					callback(null);
				});
			});
		});
	});

	app.listen(port, () => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		if (module.hot) {
			console.log("[HMR] Waiting for server-side updates");

			module.hot.accept("containers/routes", () => {
				routes = require("containers/routes");
			});

			module.hot.addStatusHandler((status) => {
				if (status === "abort") {
					setTimeout(() => process.exit(0), 0);
				}
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);
}
