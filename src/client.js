import React from "react";
import ReactAsync from "react-async";
import Router from "react-router";
import routes from "views/Routes";

/**
 * Enable Accessibility warnings on the client.
 */
if (process.env.NODE_ENV !== "production") {
	require("react-a11y")();
}

/**
 * Fire-up React Router.
 */
Router.run(routes, Router.HistoryLocation, (Handler) => {
	React.render(<Handler />, document.getElementById("react-root"));
});

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	const reactRoot = window.document.getElementById("react-root");

	if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}
