
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="w-9 h-9 rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-amber-400" />
      ) : (
        <Moon size={18} className="text-indigo-600" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
