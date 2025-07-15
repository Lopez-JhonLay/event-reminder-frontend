import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
	persist(
		(set, get) => ({
			isDarkMode: false,

			toggleTheme: () => {
				const newMode = !get().isDarkMode;
				set({ isDarkMode: newMode });

				// Apply theme to document
				if (newMode) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			},

			setTheme: (isDark) => {
				set({ isDarkMode: isDark });

				// Apply theme to document
				if (isDark) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			},

			initializeTheme: () => {
				const { isDarkMode } = get();

				// Apply theme to document on initialization
				if (isDarkMode) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			},
		}),
		{
			name: "theme-storage",
			// Only persist the theme preference
			partialize: (state) => ({ isDarkMode: state.isDarkMode }),
		}
	)
);

export default useThemeStore;
