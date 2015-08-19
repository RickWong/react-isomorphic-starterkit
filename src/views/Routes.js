import React from "react";
import {Route, DefaultRoute} from "react-router";
import Main from "views/Main";
import Greeting from "views/Greeting";

/**
 * The React Routes for both the server and the client.
 *
 * @class Routes
 */
export default (
	<Route path="/">
		<DefaultRoute handler={Main} />
		<Route name="greeting" handler={Greeting} path="greeting/:personId" />
	</Route>
);
