const React = require("react");
const Router = require("react-router");
const wrapContext = require("./helpers/wrapContext");
const routes = require("./views/Routes");

/**
 * Fire-up React Router.
 */
Router.run(routes, Router.HistoryLocation, (Handler) => {
	const clientContext = {
		data: window.SERVER_DATA || {}
	};

	Handler = wrapContext(Handler, clientContext);

	React.render(<Handler />, document.getElementById("react-root"));
});

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
const reactRoot = window.document.getElementById("react-root");

if (!reactRoot || !reactRoot.firstChild ||
	!reactRoot.firstChild.attributes["data-react-checksum"]) {
	console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
}
