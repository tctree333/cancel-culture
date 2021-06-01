const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	mode: 'jit',
	darkMode: 'class',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: { fontFamily: { sans: ['"PT Root UI"', ...defaultTheme.fontFamily.sans] } }
	},
	plugins: []
};
