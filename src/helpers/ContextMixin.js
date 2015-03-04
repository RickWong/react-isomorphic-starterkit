const React = require("react");

/**
 * @module ContextMixin
 */
const ContextMixin = {
	contextTypes: {
		contextLoaders: React.PropTypes.any,
		contextData: React.PropTypes.any
	},
	setContext (key, value) {
		if (!this.context) {
			return null;
		}

		this.context.contextData[key] = value;
	},
	getContext (key) {
		if (!this.context) {
			return null;
		}

		if (key === undefined) {
			return this.context.contextData;
		}

		return this.context.contextData[key];
	},
	loadContextOnce (key, loaderFn) {
		if (this.context.contextLoaders[key]) {
			return this.context.contextLoaders[key];
		}

		return this.context.contextLoaders[key] = loaderFn;
	},
	getContextLoaders (context) {
		return Object.keys(context.contextLoaders).map(
			(k) => context.contextLoaders[k]
		);
	},
	injectContext (Component, context) {
		let childContextTypes = {};

		Object.keys(context).map((key) => {
			childContextTypes[key] = React.PropTypes.any
		});

		const ContextualComponent = React.createClass({
			childContextTypes,
			getChildContext () {
				return context;
			},
			render () {
				return <Component />;
			}
		});

		return ContextualComponent;
	},
	serverContext () {
		let serverContext = {};

		Object.keys(ContextMixin.contextTypes).map((key) => {
			serverContext[key] = {};
		});

		return serverContext;
	},
	clientContext (window) {
		return {
			contextData: window.CONTEXT_DATA || {}
		};
	}
};

export default ContextMixin;
