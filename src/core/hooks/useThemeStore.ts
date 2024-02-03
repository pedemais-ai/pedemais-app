import create from 'zustand';
import {persist} from 'zustand/middleware'
import {faMoon, faSun, IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface State {
    theme: string,
    toggleTheme: () => void;
    icon: IconDefinition;
}

export const useThemeStore = create(persist<State>(
    (set, get) => {
        const prefersDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

        return ({
            theme: prefersDarkMode ? 'dark' : 'light',
            icon: prefersDarkMode ? faSun : faMoon,
            toggleTheme: () => {
                set((state) => {
                    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                    const newIcon = state.theme === 'dark' ? faMoon : faSun;

                    return {
                        icon: newIcon,
                        theme: newTheme,
                    };
                });
            },
        });
    },
    {
        name: "theme-storage",
    })
);