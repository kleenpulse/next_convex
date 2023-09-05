import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./public/*.svg",
	],
	theme: {
		extend: {
			backgroundColor: {
				"!bg-gray-900": "#000",
			},
			keyframes: {
				slideIn: {
					"0%": { transform: "translateX(-100%)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				slideUpBounce: {
					"0%": { transform: "translateY(100%)", opacity: "0", bottom: "0" },
					"50%": { transform: "translateY(0)", opacity: "1" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
			},
			animation: {
				slideIn: "slideIn 0.5s ease-in-out forwards",
				slideUpBounce: "slideUpBounce 0.5s ease-in-out forwards",
			},
		},
	},
	plugins: [],
};
export default config;
