/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            '2xl': { max: '1535px' },
            // => @media (max-width: 1535px) { ... }

            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' }
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            colors: {
                primary: {
                    50: '#E6F2F2',
                    100: '#CCE5E5',
                    200: '#99CCCC',
                    300: '#66B2B2',
                    400: '#339999',
                    500: '#197F7F',
                    600: '#176C6C',
                    700: '#145959',
                    800: '#104545',
                    900: '#0D3333'
                },
                dark: '#101010',
                light: '#ffffff',
                'light-gray': '#F1F3F4',
                'dark-gray': '#7D7D7D',
                'navy-blue': '#6153BD',
                'dark-navy-blue': '#493d98',
                'dark-green': '#194545',
                'light-green': '#2D8F8F'
            }
        }
    },
    plugins: [require('@tailwindcss/forms')]
};
