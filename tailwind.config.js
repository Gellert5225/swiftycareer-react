/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: [{
			mytheme: {
				"primary": "#2A2F3F",
				"secondary": "#9ca3af",
				"accent": "#356FB1",
				"neutral": "#3E4353",
				"base-100": "#202535",
				"info": "#3abff8",
				"success": "#36d399",
				"warning": "#fbbd23",
				"error": "#f87272",
				"sc-menu-bg": "#3E4353",
				"sc-light-gray": "919AAC"
			},
		  },
		],
	  },
	content: ["./src/**/*.{js,jsx,ts,tsx}",],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
}

