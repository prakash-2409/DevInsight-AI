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
 */

import React from "react";
import Dashboard from "./components/Dashboard";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
