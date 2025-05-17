import * as React from "react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  // We're keeping the component but removing the visible button since
  // we're locked to light mode and don't need a toggle anymore
  const { toggleTheme } = useTheme();

  // Return null instead of the button since we don't want to show it anymore
  return null;
}
