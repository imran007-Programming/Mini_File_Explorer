"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={toggleTheme}
      className="h-9 w-9 min-w-9 p-0"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
