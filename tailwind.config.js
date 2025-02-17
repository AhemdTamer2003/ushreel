// tailwind.config.js
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
    // any other paths...
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
                "0%": { opacity: "0" },
                "100%": { opacity: "1" },
            },
            pullPushLeft: {
                "0%, 100%": { transform: "translateX(0)" },
                "50%": { transform: "translateX(-10px)" },
            },
            pullPushRight: {
                "0%, 100%": { transform: "translateX(0)" },
                "50%": { transform: "translateX(10px)" },
            },
        },
        animation: {
            slideInLeft: "slideInLeft 0.8s ease-out forwards",
            slideInRight: "slideInRight 0.8s ease-out forwards",
            fadeIn: "fadeIn 0.8s ease-out forwards",
            pullPushLeft: "pullPushLeft 2s ease-in-out infinite",
            pullPushRight: "pullPushRight 2s ease-in-out infinite",
        },
        colors: {
            main: "var(--color-main)",
            solid: "var(--color-solid)",
            "black-transport": "var(--color-black-transport)",
        },
    },
};
export const plugins = [];
  