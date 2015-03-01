const React = require("react");
require("react/addons");
const Style = require("../helpers/Style");

/**
 * Main React application entry-point for both the server and client.
 *
 * @module Main
 */
const Main = React.createClass({
	mixins: [React.addons.PureRenderMixin],
	statics: {
		/**
		 * <Style> component allows you to write basic CSS for your component. Target
		 * your component with `&` and its children with `& selectors`. Be specific.
		 */
		css: () => `
			& * {
				font-family: sans-serif;
				color: #0df;
			}
			& {
				padding: 10px 30px 30px;
				width: 380px;
				margin: 50px auto;
				background: #222;
			}
			& .github {
				position: absolute;
				top: 0;
				right: 0;
				border: 0;
			}
		`
	},
	getInitialState() {
		/**
		 * Must be the same for server and client.
		 */
		return {};
	},
	componentWillMount() {
		/**
		 * Write your initial setup here.
		 * Must be the same for server and client.
		 */
		console.log("Hello server and client");
	},
	componentDidMount() {
		/**
		 * This is client-only.
		 */
		console.log("Hello client");
	},
	render() {
		return (
			<Style sheet={Main.css()} namespace="Main">
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
					<span>In short – <em>an excellent choice</em>. </span>
					<a href="#" onClick={(e) => {e.preventDefault(); alert("Happy coding!"); }}>Get started{'?'}</a>
				</p>
			</Style>
		);
	}
});

export default Main;
