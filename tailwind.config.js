/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			JKTSans: 'Plus Jakarta Sans'
		},
		screens: {
			'sm': '640px',

			'md': '768px',

			'lg': '1024px',

			'laptop3': {
				'min': '1280px',
				'max': '1439px'
			},

			'laptop1': {
				'min': '1440px',
				'max': '1500px'
			},

			'laptop2': {
				'raw': '(width: 1280px) and (height: 800px)'
			},
		},
	},
	plugins: []
};
