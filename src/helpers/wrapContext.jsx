const React = require("react");

/**
 * @module wrapContext
 */
const wrapContext = function (Component, context) {
	let childContextTypes = {};

	Object.keys(context).map((key) => {
		childContextTypes[key] = React.PropTypes.any
	});

	const Wrapper = React.createClass({
		childContextTypes,
		getChildContext () {
			return context;
		},
		render () {
			return <Component />;
		}
	});

	return Wrapper;
};

export default wrapContext;
