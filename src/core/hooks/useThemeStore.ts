import create from 'zustand';
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

interface State {
    icon: IconDefinition,
    theme: string,
    toggleTheme: () => void;
}

export const useThemeStore = create<State>((set, get) => {

    const prefersDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = typeof window !== 'undefined' && localStorage.getItem('data-bs-theme');

    const getIcon = (theme: string): IconDefinition => {
        return theme === 'dark' ? faMoon : faSun;
    };

    return ({
        icon: getIcon(storedTheme || (prefersDarkMode ? 'dark' : 'light')),
        theme: storedTheme || (prefersDarkMode ? 'dark' : 'light'),
        toggleTheme: () => {
            set((state) => {
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';

                // Save the new theme to localStorage
                localStorage.setItem('data-bs-theme', newTheme);

                return {
                    theme: newTheme,
                    icon: getIcon(newTheme)
                };
            });
        },
    });
});
