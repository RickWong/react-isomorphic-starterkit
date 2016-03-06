import React from "react";
import InlineCss from "react-inline-css";
import Transmit from "react-transmit";

import githubApi from "apis/github";
import Avatar from "components/Avatar";
import favicon from "favicon.ico";

const fetchStargazers  = (page, per_page = 100) => {
	return githubApi.browse(
		["repos", "RickWong/react-isomorphic-starterkit", "stargazers"],
		{ query: { page, per_page } }
	).then(json => {
		return (json || []).map(({id, login}) => ({id, login}));
	}).catch(error => {
		throw error;
	});
};

/**
 * Main React application entry-point for both the server and client.
 */
class Main extends React.Component {
	/**
	 * componentWillMount() runs on server and client.
	 */
	componentWillMount () {
		if (__SERVER__) {
			console.log("Hello server");
		}

		if (__CLIENT__) {
			console.log("Hello client");
		}
	}

	/**
	 * componentDidUpdate() only runs on the client.
	 */
	componentDidUpdate (prevProps, prevState) {
		if (!this.props.additionalStargazers) {
			return;
		}

		this.loadMoreStargazersOnClient();
	}

	/**
	 * Load more stargazers.
	 */
	loadMoreStargazersOnClient () {
		const {additionalStargazers = [], transmit} = this.props;
		let {nextPage, pagesToFetch} = transmit.variables;

		if (--pagesToFetch <= 0) {
			return;
		}

		++nextPage;

		transmit.forceFetch({
			nextPage,
			pagesToFetch,
			additionalStargazers
		}, "additionalStargazers");
	}

	/**
	 * Runs on server and client.
	 */
	render () {
		const repositoryUrl = "https://github.com/RickWong/react-isomorphic-starterkit";
		const avatarSize    = 32;
		const avatarUrl     = (id) => `https://avatars.githubusercontent.com/u/${id}?v=3&s=${avatarSize}`;

		/**
		 * This is a Transmit fragment.
		 */
		let {stargazers, additionalStargazers} = this.props;

		if (additionalStargazers) {
			stargazers = stargazers.concat(additionalStargazers);
		}

		return (
			<InlineCss stylesheet={Main.css(avatarSize)} namespace="Main">
				<a className="github" href={repositoryUrl}>
					<img src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub"/>
				</a>
				<h1>
					<img src={favicon} alt="icon"/>
					<br/>React Isomorphic Starterkit. Let&apos;s get you started!
				</h1>
				<h3>All-You-Need Features</h3>
				<ul>
					<li>Fully automated toolchain with npm run scripts</li>
					<li>React 0.14 + React Router 2.0 on the client and server</li>
					<li>Babel 6 automatically compiles ES2015 + ES7 stage-0</li>
					<li>Webpack HMR for instant server updates</li>
					<li>React Transform HMR for instant client updates</li>
					<li>React Transmit to preload on server and hydrate client</li>
					<li>InlineCss-component for styling components</li>
				</ul>
				<p>
					In short: <em>an excellent choice</em>.
					Ready to start{'?'}
				</p>
				<h3>
					Open Community
					<iframe src="https://ghbtns.com/github-btn.html?user=RickWong&repo=react-isomorphic-starterkit&type=star&count=true" frameBorder="0" scrolling="0" width="110" height="20" style={{float:"right"}}></iframe>
				</h3>
				<p>
					<Avatar />
					{stargazers && stargazers.map(user =>
						<Avatar key={user.id} user={user} />
					)}
					<Avatar />
				</p>
			</InlineCss>
		);
	}
	/**
	 * <InlineCss> component allows you to write a CSS stylesheet for your component. Target
	 * your component with `&` and its children with `& selectors`. Be specific.
	 */
	static css (avatarSize) {
		return (`
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
				width: 443px;
				margin: 10px auto;
				background: #222;
			}
		`);
	}
}

/**
 * Use Transmit to query and return GitHub stargazers as a Promise.
 */
export default Transmit.createContainer(Main, {
	initialVariables: {
		nextPage:       2,
		pagesToFetch:   15,
		additionalStargazers: []
	},
	fragments: {
		/**
		 * Load first stargazers.
		 */
		stargazers: () => fetchStargazers(1),
		/**
		 * Load more stargazers deferred.
		 */
		additionalStargazers: ({nextPage, additionalStargazers}) => {
			return () => fetchStargazers(nextPage).then(newStargazers => {
				newStargazers = newStargazers.map(({id, login}) => {
					return { id, login };
				});

				return additionalStargazers.concat(newStargazers);
			});
		}
	}
});
