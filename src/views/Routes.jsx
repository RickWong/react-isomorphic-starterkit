import React from "react";
import Router, {Route, DefaultRoute} from "react-router";
import Main from "./Main";

/**
 * The React Routes for both the server and the client.
 *
 * @module Routes
 */
const Routes = (
	<Route path="/">
		<DefaultRoute handler={Main} />
	</Route>
);

export default Routes;
