module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                black: '#000000',
                darkest: '#232323',
                darker: '#424242',
                dark: '#616161',
                gray: '#7f7f7f',
                light: '#9d9d9d',
                lighter: '#bcbcbc',
                lightest: '#dbdbdb',
                white: '#ffffff',
                red: '#c53943',
                green: '#39c575',
                orange: '#ff9966',
                blue: '#3989c5',
                indigo: '#3943c5',
                teal: '#39c5bb',
                pink: '#ff6680',
                lime: '#66ff99',
                yellow: '#ffe666',
                sky: '#66ccff',
                purple: '#a68cd9',
                cyan: '#66ffe6'
            }
        },
    },
    plugins: [],
};
