const resolvePlugin = require('rollup-plugin-node-resolve');
const pkg = require('./package.json');

function tag(name, value) {
	if (!Array.isArray(value)) {
		value = [value];
	}

	const lines = [];
	for (let i = 0; i < value.length; i++) {
		lines.push(`// @${name} ${value[i]}\n`);
	}
	return lines.join('');
}
function generateHeader() {
	const head = '// ==UserScript==\n';
	const tail = '// ==/UserScript==\n';
	const tagNames = Object.keys(pkg.userscript);
	const lines = [];

	for (let i = 0; i < tagNames.length; i++) {
		const tagName = tagNames[i];
		const tagValue = pkg.userscript[tagName];

		lines.push(tag(tagName, tagValue));
	}

	return head + lines.join('') + tail;
}

export default {
	input: 'src/index.js',
	output: {
		banner: generateHeader(),
		file: `build/${pkg.name}.user.js`,
		format: 'iife',
	},
	watch: {
		exclude: ['node_modules/**'],
	},
	plugins: [
		resolvePlugin(),
	],
};
