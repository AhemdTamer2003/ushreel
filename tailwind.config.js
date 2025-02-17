/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
    extend: {
        keyframes: {
            slideInLeft: {
                "0%": { transform: "translateX(-100%)", opacity: "0" },
                "100%": { transform: "translateX(0)", opacity: "1" },
            },
            slideInRight: {
                "0%": { transform: "translateX(100%)", opacity: "0" },
                "100%": { transform: "translateX(0)", opacity: "1" },
            },
            fadeIn: {
                "0%": { opacity: "0", transform: "translateY(20px)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
            },
            pullPushLeft: {
                "0%, 100%": { transform: "translateX(0)" },
                "50%": { transform: "translateX(-10px)" },
            },
            pullPushRight: {
                "0%, 100%": { transform: "translateX(0)" },
                "50%": { transform: "translateX(10px)" },
            },
            slideInFromLeft: {
                "0%": { opacity: "0", transform: "translateX(-30px)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
            },
            slideInFromRight: {
                "0%": { opacity: "0", transform: "translateX(30px)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
            },
            bounceSlow: {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
            },
            pulseSlow: {
                "0%, 100%": { opacity: "1" },
                "50%": { opacity: "0.7" },
            },
        },
        animation: {
            slideInLeft: "slideInLeft 0.8s ease-out forwards",
            slideInRight: "slideInRight 0.8s ease-out forwards",
            fadeIn: "fadeIn 0.8s ease-out forwards",
            pullPushLeft: "pullPushLeft 2s ease-in-out infinite",
            pullPushRight: "pullPushRight 2s ease-in-out infinite",
            slideInFromLeft: "slideInFromLeft 1s ease-out forwards",
            slideInFromRight: "slideInFromRight 1s ease-out forwards",
            bounceSlow: "bounceSlow 2s infinite",
            pulseSlow: "pulseSlow 3s infinite",
        },
        colors: {
            main: "var(--color-main)",
            solid: "var(--color-solid)",
            "black-transport": "var(--color-black-transport)",
        },
        backdropFilter: {
            'none': 'none',
            'blur': 'blur(8px)',
        },
        transitionDuration: {
            '2000': '2000ms',
            '3000': '3000ms',
        },
        scale: {
            '102': '1.02',
        },
    },
};

export const plugins = [];