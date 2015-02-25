/**
 * Trims leading whitespaces on every line.
 *
 * @param string
 * @returns {string}
 * @module ltrim
 */
const ltrim = (string) => {
	return string.replace(/(^|\n)[\n\s]+/g, "$1");
};

export default ltrim;
