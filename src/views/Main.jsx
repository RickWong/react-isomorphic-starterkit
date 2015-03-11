import React from "react";
import InlineCss from "react-inline-css";
import Superagent from "superagent";
import ContextHelper from "../helpers/ContextHelper";

/**
 * Main React application entry-point for both the server and client.
 *
 * @module Main
 */
const Main = React.createClass({
	mixins: [
		ContextHelper.Mixin
	],
	/**
	 * Server and client.
	 */
	getInitialState() {
		/**
		 * Server renders this component twice. The 1st pass without context data, but it will let
		 * you load the context data. Then the 2nd pass will have the loaded context. You MUST
		 * return exactly the same initial state on the server (2nd pass), as on the client.
		 */
		return {
			stargazers: this.getContext("stargazers") || []
		};
	},
	/**
	 * Server and client. Use Superagent to retrieve the list of GitHub stargazers.
	 */
	loadStargazersFn (untilAllLoaded, currentPage, completedFn) {
		Superagent.get(
			`https://api.github.com/repos/RickWong/react-isomorphic-starterkit/stargazers?per_page=100&page=${currentPage}`
		).
		end((error, response) => {
			let stargazers = this.getContext("stargazers") || [];

			if (response && Array.isArray(response.body)) {
				stargazers = stargazers.concat(response.body.map((user) => {
					return {
						id: user.id,
						login: user.login
					};
				}));

				this.setContext("stargazers", stargazers);

				if (untilAllLoaded && response.body.length >= 100) {
					return this.loadStargazersFn(untilAllLoaded, currentPage + 1, completedFn);
				}
			}

			completedFn(error, stargazers);
		});
	},
	/**
	 * Server and client.
	 */
	componentWillMount() {
		/**
		 * Use context loader here on the server.
		 */
		if (__SERVER__) {
			// Load the first 100 stargazers on the server.
			this.loadContextOnce("stargazers", (completedFn) => {
				this.loadStargazersFn(false, 1, completedFn);
			});
		}

		/**
		 * Simply use this.setState() on the client.
		 */
		if (__CLIENT__) {
			// Load the rest of the stargazers on the client.
			this.loadStargazersFn(true, 2, (error, stargazers) => {
				this.setState({stargazers});
			});
		}
	},
	statics: {
		/**
		 * <InlineCss> component allows you to write basic CSS for your component. Target
		 * your component with `&` and its children with `& selectors`. Be specific.
		 * You're not required to use this helper component.
		 */
		css: (avatarSize) => `
			& .github {
				position: absolute;
				top: 0;
				right: 0;
				border: 0;
			}
			& {
				font-family: sans-serif;
				color: #0df;
				padding: 10px 30px 30px;
				width: 380px;
				margin: 10px auto;
				background: #222;
			}
			& .avatar {
				border-radius: 50%;
				width: ${avatarSize}px;
				height: ${avatarSize}px;
				margin: 0 2px 2px 0;
			}`
	},
	/**
	 * Server and client.
	 */
	render() {
		const repositoryUrl = "https://github.com/RickWong/react-isomorphic-starterkit";
		const avatarSize = 32;
		const avatarUrl = (id) => `https://avatars.githubusercontent.com/u/${id}?v=3&s=${avatarSize}`;

		return (
			<InlineCss stylesheet={Main.css(avatarSize)} namespace="Main">
				<a className="github" href={repositoryUrl}>
					<img src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" />
				</a>
				<h1>
					<img src="/favicon.ico" alt="icon" /> <br/> Welcome to React Isomorphic Starterkit.
				</h1>
				<h3>Features</h3>
				<ul>
					<li>Fully automated with npm run scripts</li>
					<li>Supervisor with Hapi.js server</li>
					<li>Webpack for watch and production builds</li>
					<li>React.js + Router on the client and server</li>
					<li>React Hot Loader for instant client updates</li>
					<li>Babel.js automatically compiles ES6</li>
					<li>Context-helper to preload on server to client</li>
					<li>Style-component for quick in-component CSS</li>
					<li>Accessibility hints from react-a11y</li>
					<li>Shrinkwrapped npm dependencies</li>
				</ul>
				<p>
					In short – <em>an excellent choice</em>.
					Ready to start{'?'}
				</p>
				<h3>Community</h3>
				<p>
					<a href={repositoryUrl} title="you here? star us!">
					{this.state.stargazers.map((user) => {
						return <img key={user.id} className="avatar" src={avatarUrl(user.id)} title={user.login} alt={user.login} />;
					})}
						<img className="avatar" src={avatarUrl(0)} alt="you?" />
					</a>
				</p>
			</InlineCss>
		);
	}
});

export default Main;
