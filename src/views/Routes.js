import React from "react";
import Router, {Route, DefaultRoute} from "react-router";
import Main from "./Main";

/**
 * The React Routes for both the server and the client.
 *
 * @class Routes
 */
export default (
	<Route path="/">
		<DefaultRoute handler={Main} />
	</Route>
);
