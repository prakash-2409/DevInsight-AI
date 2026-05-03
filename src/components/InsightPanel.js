/**
 * InsightPanel.js
 *
 * Displays the key insight - what your metrics actually mean.
 * Dark mode support with smooth transitions.
 *
 * KEY PRODUCT CONCEPT:
 * This is where the magic happens. Instead of showing raw data,
 * it tells developers WHY they should care and WHAT IT MEANS.
 *
 * ENHANCED WITH:
 * - Root cause reasoning ("Why is this happening?")
 * - Impact assessment ("Should I care?")
 * - Deviation from target ("How far off are we?")
 *
 * Example transformation:
 * Before: "Lead time: 5.2 days"
 * After: "Your code takes too long to reach production (5.2 days vs 2 day target = 160% higher).
 *         This delays customer value. Root cause: Slow code reviews.
 *         → Speed up code reviews"
 *
 * This component converts DATA → UNDERSTANDING → ROOT CAUSE → ACTION
 */

import React from "react";

const InsightPanel = ({ insights, priority }) => {
  if (!priority) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50 dark:bg-slate-800 dark:border-slate-700";
      case "medium":
        return "border-yellow-500 bg-yellow-50 dark:bg-slate-800 dark:border-slate-700";
      case "low":
        return "border-green-500 bg-green-50 dark:bg-slate-800 dark:border-slate-700";
      default:
        return "border-blue-500 bg-blue-50 dark:bg-slate-800 dark:border-slate-700";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return "🔴 Critical";
      case "medium":
        return "🟡 Attention";
      case "low":
        return "🟢 Good";
      default:
        return "ℹ️ Info";
    }
  };

  return (
    <div
      className={`border-l-4 p-6 rounded-lg shadow-md dark:shadow-lg bg-white dark:bg-slate-800 transition-all duration-300 ${getSeverityColor(
        priority.severity
      )}`}
    >
      {/* Header with metric and severity badge */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {priority.metric}
        </h2>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
            priority.severity === "high"
              ? "bg-red-200 dark:bg-slate-700 text-red-800 dark:text-red-200"
              : priority.severity === "medium"
              ? "bg-yellow-200 dark:bg-slate-700 text-yellow-800 dark:text-yellow-200"
              : "bg-green-200 dark:bg-slate-700 text-green-800 dark:text-green-200"
          }`}
        >
          {getSeverityIcon(priority.severity)}
        </span>
      </div>

      {/* Current Status with Deviation */}
      <div className="bg-white dark:bg-slate-700 bg-opacity-60 dark:bg-opacity-30 p-3 rounded border-l-2 border-gray-300 dark:border-slate-600 mb-4 transition-all duration-300">
        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1 transition-colors duration-300">
          📊 Current Status
        </p>
        <p className="text-sm text-gray-900 dark:text-white font-bold transition-colors duration-300">
          {priority.message}
        </p>
      </div>

      {/* Main insight - the key takeaway */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400 font-medium text-xs mb-1 uppercase transition-colors duration-300">
          The Problem
        </p>
        <p className="text-gray-900 dark:text-white font-bold leading-relaxed transition-colors duration-300">
          {priority.insight}
        </p>
      </div>

      {/* Root Cause - WHY is this happening? */}
      {priority.rootCause && (
        <div className="bg-orange-50 dark:bg-slate-700/50 p-3 rounded border-l-2 border-orange-300 dark:border-orange-600 mb-4 transition-all duration-300">
          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1 transition-colors duration-300">
            🔍 Root Cause
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            {priority.rootCause}
          </p>
        </div>
      )}

      {/* Why it matters - the impact */}
      <div className="bg-blue-50 dark:bg-slate-700/50 p-3 rounded border-l-2 border-blue-300 dark:border-blue-600 mb-4 transition-all duration-300">
        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1 transition-colors duration-300">
          ⚡ Why It Matters
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          {priority.impact}
        </p>
      </div>

      {/* Trend indicator */}
      <div className="flex justify-between items-center text-sm py-3 border-t border-gray-300 dark:border-slate-700 transition-all duration-300">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300">
            Trend
          </p>
          <p className="text-gray-900 dark:text-white font-bold text-lg transition-colors duration-300">
            {priority.trend}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300">
            Action Required
          </p>
          <p className="text-gray-900 dark:text-white font-bold transition-colors duration-300">
            {priority.severity === "high" ? "🚨 Now" : priority.severity === "medium" ? "📅 Soon" : "✅ Monitor"}
          </p>
        </div>
      </div>

      {/* Secondary insights */}
      {insights.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-700 transition-colors duration-300">
          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2 transition-colors duration-300">
            Other Areas:
          </p>
          <div className="space-y-2">
            {insights.slice(1, 3).map((insight) => (
              <div key={insight.id} className="text-xs text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <span className="font-semibold">{insight.metric}</span>
                <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  {" "}
                  — {insight.severity === "high" ? "🔴" : insight.severity === "medium" ? "🟡" : "🟢"}{" "}
                  {insight.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightPanel;
