/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'media',
	content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', "node_modules/flowbite/**/*.js"],
	theme: {
		colors: {
			'mainBlue': '#2A2F3F',
			'mainBlueDark': '#202535',
			'mainBlueTint': '#356FB1',
			'mainBlueLight': '#343949',
			'menuBg': '#3E4353',
			'lightGray': '#919AAC'
		},
		
		extend: {},
	},
	plugins: [require('flowbite/plugin')],
}

