
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="w-9 h-9 rounded-full bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/70"
      aria-label="Theme is locked to dark mode"
    >
      <span className="sr-only">Theme is locked to dark mode</span>
    </Button>
  );
}
