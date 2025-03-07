import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			violet: '#0099ff',
  			white: '#FFFFFF',
  			purple: '#CC00FF',
  			black: '#000000'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			jiggle: {
  				'0%, 100%': {
  					transform: 'rotate(0deg)'
  				},
  				'25%': {
  					transform: 'rotate(-3deg)'
  				},
  				'75%': {
  					transform: 'rotate(3deg)'
  				}
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			}
  		},
  		animation: {
  			jiggle: 'jiggle 0.5s ease-in-out infinite',
  			'shiny-text': 'shiny-text 8s infinite'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
