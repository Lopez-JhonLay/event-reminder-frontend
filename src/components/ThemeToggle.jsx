import React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useThemeStore from "@/store/theme";

function ThemeToggle() {
	const { isDarkMode, toggleTheme } = useThemeStore();

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={toggleTheme}
			className="flex items-center gap-2"
		>
			{isDarkMode ? (
				<>
					<Sun className="h-4 w-4" />
					Switch to Light Mode
				</>
			) : (
				<>
					<Moon className="h-4 w-4" />
					Switch to Dark Mode
				</>
			)}
		</Button>
	);
}

export default ThemeToggle;
