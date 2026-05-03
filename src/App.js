/**
 * App.js - Main Application Component
 *
 * Entry point for the Developer Productivity Insight Dashboard MVP.
 *
 * DESIGN PHILOSOPHY:
 * - Simplicity: One dashboard, all key information visible
 * - Clarity: Every metric has an accompanying insight
 * - Actionability: Every insight has concrete recommendations
 * - Demo-ready: No authentication, no complex workflows
 * - Theme Support: Smooth dark/light mode switching
 */

import React from "react";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
