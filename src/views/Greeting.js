import React from "react";
import InlineCss from "react-inline-css";
import Transmit from "react-transmit";

class Greeting extends React.Component {
	render () {
		return <h1>Hello, {this.props.person.name}</h1>;
	}
}

export default Transmit.createContainer(Greeting, {
	queries: {
		person (queryParams) {
			// Calling the API when rendering on the server and when rendering
			// on the client.
			
			const api = `http://localhost:8000/api/names/${queryParams.personId}`;
			return fetch(api).then((response) => response.json());
		}
	}
});
