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
		css: `
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
		`
	},
	getInitialState() {
		/**
		 * DO NOT perform any client-only code here.
		 */
		return {};
	},
	componentDidMount() {
		/**
		 * Write your client-only code here.
		 */
		console.log("hi");
	},
	render() {
		return (
			<Style sheet={Main.css}>
				<h1><img src="/favicon.ico" /> <br/> Welcome to React Isomorphic Starterkit.</h1>
				<h3>Features</h3>
				<ul>
					<li>Fully automated with npm run scripts</li>
					<li>Supervisor with Hapi.js server</li>
					<li>Webpack for watch and production builds</li>
					<li>React.js + Router on the client and server</li>
					<li>React Hot Loader for instant client updates</li>
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
