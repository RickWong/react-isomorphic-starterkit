import Async from "async";
import React from "react";

/**
 * @class ContextMixin
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
			return undefined;
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
	}
};

/**
 * @class ContextHelper
 */
const ContextHelper = {
	Mixin: ContextMixin,
	getContextLoaders (context) {
		return Object.keys(context.contextLoaders).map(
			(k) => context.contextLoaders[k]
		);
	},
	injectContext (Component, context, callbackFn) {
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

		if (__CLIENT__) {
			callbackFn(ContextualComponent);
			return;
		}

		/**
		 * Fake-render the components without output so they can register context loaders.
		 */
		React.renderToString(<ContextualComponent />);
		const contextLoaders = ContextHelper.getContextLoaders(context);

		Async.parallel(contextLoaders, (error, result) => {
			callbackFn(ContextualComponent);
		});
	},
	getServerContext () {
		let serverContext = {};

		Object.keys(ContextMixin.contextTypes).map((key) => {
			serverContext[key] = {};
		});

		return serverContext;
	},
	getClientContext (window) {
		return {
			contextLoaders: {},
			contextData: window.CONTEXT_DATA || {}
		};
	}
};

export default ContextHelper;
