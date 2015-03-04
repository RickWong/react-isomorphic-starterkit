const React = require("react");

let refCounter = 0;

/**
 * @module Style
 */
const Style = React.createClass({
	displayName: 'Style',
	propTypes: {
		sheet: React.PropTypes.string.isRequired,
		namespace: React.PropTypes.string,
		wrapper: React.PropTypes.string
	},
	_transformSheet (sheet, namespace) {
		return sheet.
			// Prettier output.
			replace(/}\s*/ig, '\n}\n').
			// Regular rules are namespaced.
			replace(
				/(^|}|;|,)\s*([&a-z0-9\-_\.:#\(\),>*\s]+)\s*(\{)/ig,
				(matched) => matched.replace(/&/g, `#${namespace}`)
			);
	},
	render() {
		const Wrapper = this.props.wrapper || "div";
		const namespace = this.props.namespace || "react-style-" + refCounter++;
		const transformedSheet = this._transformSheet(this.props.sheet, namespace);

		return <Wrapper id={namespace}>
			{this.props.children}
			<style scoped dangerouslySetInnerHTML={{__html: transformedSheet}} />
		</Wrapper>;
	}
});

export default Style;
