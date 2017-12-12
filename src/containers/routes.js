import React from "react";
import {IndexRoute, Route} from "react-router";

import App from "./App";

import Main from "./Main";

/**
 * The React Router routes for both the server and the client.
 */
module.exports = (
	<Route path="/" component={App}>
		<IndexRoute component={Main} />
	</Route>
);
