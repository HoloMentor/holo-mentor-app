const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './node_modules/react-tailwindcss-select/dist/index.esm.js'
    ],
    theme: {
        screens: {
            'max-2xl': { max: '1535px' },
            // => @media (max-width: 1535px) { ... }

            'max-xl': { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            'max-lg': { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            'max-md': { max: '767px' },
            // => @media (max-width: 767px) { ... }

            'max-sm': { max: '639px' }
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            },
            colors: {
                'second-white': '#F1F3F4',
                'light-border': '#0000001A',
                orange: '#FF0E00',
                'light-gray': '#F1F3F4',
                'dark-gray': '#7D7D7D',
                'navy-blue': '#6153BD',
                'dark-navy-blue': '#493d98',
                'dark-green': '#194545',
                'light-green': '#2D8F8F'
            },
            boxShadow: {
                custom: '1px 4px 8.7px 0px rgba(0, 0, 0, 0.29)'
            }
        }
    },
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: '#194545',
                            foreground: '#fff'
                        },
                        focus: '#194545'
                    }
                }
            }
        }),
        require('@tailwindcss/forms')
    ]
};
