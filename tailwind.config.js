/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Noto Sans TC', 'sans-serif'],
                'display': ['Dancing Script', 'cursive'],
                'handwriting': ['Patrick Hand', 'cursive'],
                'kalam': ['Kalam', 'cursive'],
                'gaegu': ['Gaegu', 'cursive'],
            },
            colors: {
                rose: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                },
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
