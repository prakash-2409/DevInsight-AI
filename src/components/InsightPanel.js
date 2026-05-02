/**
 * InsightPanel.js
 *
 * Displays the key insight - what your metrics actually mean.
 *
 * KEY PRODUCT CONCEPT:
 * This is where the magic happens. Instead of showing raw data,
 * it tells developers WHY they should care and WHAT IT MEANS.
 *
 * Example transformation:
 * Before: "Lead time: 5.2 days"
 * After: "Your code takes too long to reach production (5.2 days vs 2 day target).
 *         This delays customer value and feedback. → Speed up code reviews"
 *
 * This component converts DATA → UNDERSTANDING → ACTION
 */

import React from "react";

const InsightPanel = ({ insights, priority }) => {
  if (!priority) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-blue-500 bg-blue-50";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return "⚠️ Critical";
      case "medium":
        return "⚡ Attention";
      case "low":
        return "✅ Good";
      default:
        return "ℹ️ Info";
    }
  };

  return (
    <div
      className={`border-l-4 p-6 rounded-lg shadow-md bg-white ${getSeverityColor(
        priority.severity
      )}`}
    >
      {/* Header with metric and severity badge */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-bold text-gray-900">{priority.metric}</h2>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            priority.severity === "high"
              ? "bg-red-200 text-red-800"
              : priority.severity === "medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {getSeverityIcon(priority.severity)}
        </span>
      </div>

      {/* Main insight - the key takeaway */}
      <div className="mb-4">
        <p className="text-gray-700 font-medium text-sm mb-2">THE PROBLEM:</p>
        <p className="text-gray-900 text-lg font-bold leading-relaxed">
          {priority.insight}
        </p>
      </div>

      {/* Why it matters - the impact */}
      <div className="bg-white bg-opacity-60 p-4 rounded border-l-2 border-gray-300 mb-4">
        <p className="text-gray-600 text-sm mb-1 font-semibold">WHY IT MATTERS:</p>
        <p className="text-gray-700 text-sm leading-relaxed">{priority.impact}</p>
      </div>

      {/* Current state and target */}
      <div className="flex justify-between items-center text-sm">
        <div>
          <p className="text-gray-600 text-xs">Current Status</p>
          <p className="text-gray-900 font-bold">{priority.message}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-xs">Trend</p>
          <p className="text-gray-900 font-bold text-lg">{priority.trend}</p>
        </div>
      </div>

      {/* Secondary insights */}
      {insights.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-2">
            Other Areas:
          </p>
          <div className="space-y-2">
            {insights.slice(1, 3).map((insight) => (
              <div key={insight.id} className="text-xs text-gray-700">
                <span className="font-semibold">{insight.metric}</span>
                <span className="text-gray-500">
                  {" "}
                  — {insight.severity === "high" ? "⚠️" : insight.severity === "medium" ? "⚡" : "✅"}{" "}
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
