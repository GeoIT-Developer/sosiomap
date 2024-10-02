import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './containers/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#cc0004',
                secondary: '#f5a200',
            },
            fontFamily: {
                pacifico: ['Pacifico', 'cursive'],
            },
        },
    },
    plugins: [],
};
export default config;
