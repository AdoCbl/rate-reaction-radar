
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
      className="w-9 h-9 rounded-full bg-white/30 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-700/70"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-amber-500" />
      ) : (
        <Moon size={18} className="text-indigo-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
