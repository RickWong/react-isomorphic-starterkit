const React = require("react");
const Router = require("react-router");
const Main = require("./Main");

const {Route, DefaultRoute} = Router;

/**
 * The React Routes for both the server and the client.
 *
 * @type {ReactElement}
 * @module Routes
 */
const Routes = (
	<Route path="/">
		<DefaultRoute handler={Main} />
	</Route>
);

export default Routes;
