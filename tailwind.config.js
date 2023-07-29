/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const primary = '#E30B13'

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/components/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		//* add user colors and disabled tailwind colors

		colors: {
			primary,
			black: colors.black,
			white: colors.white,
			transparent: colors.transparent,
			yellow: {
				700: '#F5C521'
			},
			red: colors.red,
			gray: {
				300: '#d9dae8',
				500: '#999AA5',
				600: '#66676E',
				700: '#39393F',
				800: '#242529',
				900: '#191B1F',
				950: '#101215'
			}
		},

		extend: {
			//* add padding ans spacing to tailwind

			spacing: {
				0.5: '0.12rem',
				layout: '2.75rem'
			},

			//* add fontSize to tailwind

			fontSize: {
				'2lg': '1.38rem'
			},

			//* add borderRadius to tailwind

			borderRadius: {
				image: '0.5rem',
				layout: '0.8rem'
			},

			//* add transitions to tailwind

			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},

			transitionDuration: {
				DEFAULT: '200ms'
			},

			//* add z-index to tailwind
			zIndex: {
				1: '1',
				2: '2',
				3: '3'
			},

			//* add keyframes to tailwind

			keyframes: {
				fade: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				},

				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)'
					},
					'50%': {
						opacity: 0.3
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)'
					}
				}
			},

			//* add animation to tailwind

			animation: {
				fade: 'fade .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out'
			}
		}
	},
	plugins: [
		plugin(({ addComponents, theme, addUtilities }) => {
			//* components plugin

			addComponents({
				'.btn-primary': {
					backgroundColor: primary,
					color: '#ffff',
					borderRadius: '0.65rem',
					transition: 'background-color .3s ease-in-out',
					'&:hover': {
						backgroundColor: '#ff0009'
					}
				},

				'.text-link': {
					textUnderlineOffset: 4,
					color: 'rgba(255,255,255,.9)',
					transition: 'text-decoration-color .3s ease-in-out',
					textDecorationLine: 'underline',
					textDecorationColor: 'rgba(255,255,255,0.2)',
					'&:hover': {
						textDecorationColor: 'rgba(255,255,255,0.9)'
					}
				},

				'.air-block': {
					borderRadius: theme('borderRadius.layout'),
					backgroundColor: theme('colors.gray.950'),
					color: theme('colors.white'),
					boxShadow: theme('boxShadow.lg')
				}
			}),
				//* add utilities to tailwind

				addUtilities({
					//* add text-shadow

					'.text-shadow': {
						textShadow: '1px 1px rgba(0,0,0,0.4)'
					},

					//* add outline and border

					'.outline-border-none': {
						outline: 'none',
						border: 'none'
					},

					//* add flex position default

					'.flex-center-between': {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between'
					},

					//* add image-like button

					'.image-like-bg': {
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none'
					}
				})
		})
	]
}
