/**
 * ThemeToggle.js - Theme Switcher Button
 *
 * Beautiful toggle button for switching between dark and light modes.
 * Smooth transitions and professional appearance.
 */

import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-12 rounded-lg
        transition-all duration-300 ease-in-out
        ${
          theme === "light"
            ? "bg-gray-100 text-yellow-500 hover:bg-gray-200"
            : "bg-slate-700 text-blue-300 hover:bg-slate-600"
        }
        shadow-md hover:shadow-lg
        group
      `}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`
          absolute w-6 h-6
          transition-all duration-300 ease-in-out
          ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}
        `}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 18C6.48 18 2 13.52 2 8c0-.78.1-1.54.29-2.25A8 8 0 0112 2c1.48 0 2.89.23 4.23.68 1.34-.45 2.75-.68 4.23-.68 0 6.16-4.84 11-11 11zm0-16c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
        <circle cx="12" cy="8" r="6" />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`
          absolute w-6 h-6
          transition-all duration-300 ease-in-out
          ${theme === "dark" ? "opacity-100 -rotate-90" : "opacity-0 rotate-0"}
        `}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Tooltip */}
      <span
        className={`
          absolute bottom-full mb-2 px-3 py-1 rounded-md
          text-sm font-medium whitespace-nowrap
          transition-all duration-300 ease-in-out
          pointer-events-none
          ${
            theme === "light"
              ? "bg-gray-800 text-white group-hover:opacity-100 opacity-0"
              : "bg-slate-900 text-white group-hover:opacity-100 opacity-0"
          }
        `}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
