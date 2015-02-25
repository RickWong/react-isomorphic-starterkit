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
	getDefaultProps () {
		return {namespace: "style-" + (++refCounter)};
	},
	_transformSheet (sheet, namespace) {
		return sheet.
			// Put all CSS-properties at start of new line.
			replace(/([a-z0-9\-_]+\s*:)(?!\/\/)/ig, '\n  $1').
			// Prettier output.
			replace(/}\s*/ig, '\n}\n').
			// Regular rules are namespaced.
			replace(
				/(^|}|;|,)\s*([&a-z0-9\-_\.:#\(\),>*\s]+)\s*(\{)/ig,
				(matched) => matched.replace(/&/g, `.${namespace}`)
			);
	},
	render() {
		const Wrapper = this.props.wrapper || "div";
		const transformedSheet = this._transformSheet(this.props.sheet, this.props.namespace);

		return <Wrapper className={this.props.namespace}>
			{this.props.children}
			<style scoped dangerouslySetInnerHTML={{__html: transformedSheet}} />
		</Wrapper>;
	}
});

export default Style;
