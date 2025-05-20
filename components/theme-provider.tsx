"use client";

import * as React from "react";
import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
	useTheme,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [mounted, setMounted] = React.useState(false);

	// Only render children after first mount to avoid hydration mismatch
	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<NextThemesProvider {...props} defaultTheme="light" enableSystem>
			{mounted ? (
				children
			) : (
				<div style={{ visibility: "hidden" }}>{children}</div>
			)}
		</NextThemesProvider>
	);
}

// Utility hook to get current theme value safely
export function useThemeValue() {
	const { theme, systemTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return "light";

	return theme === "system" ? systemTheme : theme;
}
