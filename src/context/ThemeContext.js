/**
 * ThemeContext.js - Global Theme Management
 *
 * Manages dark/light theme state globally.
 * Persists user preference to localStorage.
 * Provides theme context to entire app.
 */

import React, { createContext, useContext, useEffect, useState } from "react";

// Create theme context with default value
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

/**
 * ThemeProvider Component
 * Wrap your app with this to enable theme switching
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Apply light theme immediately to prevent flash
    applyTheme("light");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }

    setMounted(true);
  }, []);

  // Apply theme to document
  const applyTheme = (newTheme) => {
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 * Usage: const { theme, toggleTheme } = useTheme();
 * Safe to use - provides default values even if outside provider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
