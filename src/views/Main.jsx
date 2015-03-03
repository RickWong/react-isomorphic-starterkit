const React = require("react");
const Style = require("../helpers/Style");

/**
 * Main React application entry-point for both the server and client.
 *
 * @module Main
 */
const Main = React.createClass({
	getInitialState() {
		/**
		 * Must be the same for server and client.
		 */
		return {stargazers: []};
	},
	componentWillMount() {
		/**
		 * Perform perfect isomorphic operations that run on server & client.
		 */
		console.log("Hello server and client");
	},
	componentDidMount() {
		/**
		 * Client-only.
		 */
		console.log("Hello client again");

		if (__CLIENT__) {
			const Superagent = require("superagent");

			Superagent.
				get(
					"https://api.github.com/repos/RickWong/react-isomorphic-starterkit/stargazers?per_page=500"
				).
				end((response) => {
					if (response.body.length) {
						this.setState({stargazers: response.body});
					}
				});
		}
	},
	statics: {
		/**
		 * <Style> component allows you to write basic CSS for your component. Target
		 * your component with `&` and its children with `& selectors`. Be specific.
		 * You're not required to use this helper component.
		 */
		css: (avatarSize) => `
			& * {
				font-family: sans-serif;
				color: #0df;
			}
			& .github {
				position: absolute;
				top: 0;
				right: 0;
				border: 0;
			}
			& {
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
			}
			& .you {
				opacity: .3;
				transition: opacity .3s ease-out;
			}
			&:hover .you {opacity: 1;}
		`
	},
	render() {
		let avatarSize = 32;

		return (
			<Style sheet={Main.css(avatarSize)} namespace="Main">
				<a className="github" href="https://github.com/RickWong/react-isomorphic-starterkit"><img src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" /></a>
				<h1><img src="/favicon.ico" /> <br/> Welcome to React Isomorphic Starterkit.</h1>
				<h3>Features</h3>
				<ul>
					<li>Fully automated with npm run scripts</li>
					<li>Supervisor with Hapi.js server</li>
					<li>Webpack for watch and production builds</li>
					<li>React.js + Router on the client and server</li>
					<li>React Hot Loader for instant client updates</li>
					<li>Babel.js automatically compiles ES6</li>
					<li>Style-component for quick in-component CSS</li>
					<li>Shrinkwrapped npm dependencies</li>
				</ul>
				<p>
					In short – <em>an excellent choice</em>.
					Ready to start{'?'}
				</p>
				<h3>Community</h3>
				<p>
					{this.state.stargazers.map((user) => {
						return (
							<img key={user.id} className="avatar" src={user.avatar_url + "&s=" + avatarSize*2} title={user.login} alt={user.login} />
						);
					})}
					<a href="https://github.com/RickWong/react-isomorphic-starterkit" className="you" title="you here? star us!">
						<img className="avatar" src={"https://avatars.githubusercontent.com/u/0?v=3&s=" + avatarSize*2} alt="you?" />
					</a>
				</p>
			</Style>
		);
	}
});

export default Main;
