const React = require("react");
const Router = require("react-router");
const ContextHelper = require("./helpers/ContextHelper");
const routes = require("./views/Routes");

/**
 * Fire-up React Router.
 */
Router.run(routes, Router.HistoryLocation, (Handler) => {
	/**
	 * Get Client Context passed along by the server, and inject it.
	 */
	const clientContext = ContextHelper.getClientContext(window);
	const ContextualHandler = ContextHelper.injectContext(Handler, clientContext);

	React.render(<ContextualHandler />, document.getElementById("react-root"));
});

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
const reactRoot = window.document.getElementById("react-root");

if (!reactRoot || !reactRoot.firstChild ||
	!reactRoot.firstChild.attributes["data-react-checksum"]) {
	console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
}
