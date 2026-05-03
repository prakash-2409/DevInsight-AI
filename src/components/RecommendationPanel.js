/**
 * RecommendationPanel.js
 *
 * Displays actionable recommendations based on insights.
 * Dark mode support with smooth transitions.
 *
 * KEY PHILOSOPHY:
 * Don't just tell developers what's wrong. Tell them HOW to fix it.
 * Include impact estimate so they can prioritize.
 *
 * Example:
 * ❌ Bad: "Your lead time is high"
 * ✅ Good: "Implement Code Review SLA (4-hour max review time)
 *          → Expected 40% improvement in lead time
 *          → Takes 1-2 days to implement"
 */

import React, { useState } from "react";

const RecommendationPanel = ({ recommendations }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "border-red-500 bg-red-50 dark:bg-slate-800 dark:border-slate-700";
      case "high":
        return "border-orange-500 bg-orange-50 dark:bg-slate-800 dark:border-slate-700";
      case "medium":
        return "border-blue-500 bg-blue-50 dark:bg-slate-800 dark:border-slate-700";
      default:
        return "border-gray-300 bg-gray-50 dark:bg-slate-800 dark:border-slate-700";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-200 dark:bg-slate-700 text-red-800 dark:text-red-200";
      case "high":
        return "bg-orange-200 dark:bg-slate-700 text-orange-800 dark:text-orange-200";
      case "medium":
        return "bg-blue-200 dark:bg-slate-700 text-blue-800 dark:text-blue-200";
      default:
        return "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200";
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 dark:from-slate-900 to-blue-700 dark:to-slate-950 text-white p-6 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-1">🎯 What To Do</h2>
        <p className="text-blue-100 dark:text-gray-400 text-sm transition-colors duration-300">
          Actionable steps to improve your metrics
        </p>
      </div>

      {/* Recommendations list */}
      <div className="divide-y divide-gray-200 dark:divide-slate-700 transition-colors duration-300">
        {recommendations.slice(0, 3).map((rec, index) => (
          <div
            key={rec.id}
            className={`border-l-4 transition-all duration-300 ${getPriorityColor(
              rec.priority
            )}`}
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-300"
              onClick={() => toggleExpand(rec.id)}
            >
              {/* Main recommendation header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Step {index + 1}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 ${getPriorityBadge(
                        rec.priority
                      )}`}
                    >
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    {rec.action}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 transition-colors duration-300">
                    {rec.description}
                  </p>

                  {/* Impact and effort */}
                  <div className="flex gap-6 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase transition-colors duration-300">
                        Expected Impact
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-bold transition-colors duration-300">
                        {rec.impact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase transition-colors duration-300">
                        Effort
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold transition-colors duration-300">
                        {rec.effort}
                      </p>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  {rec.implementation && (
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-2 transition-colors duration-300">
                      {expandedId === rec.id
                        ? "▼ Hide Details"
                        : "▶ Show Implementation Steps"}
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable implementation details */}
              {expandedId === rec.id && rec.implementation && (
                <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-700/50 bg-opacity-50 p-4 rounded transition-all duration-300">
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-3 transition-colors duration-300">
                    How to Implement:
                  </p>
                  <ul className="space-y-2">
                    {rec.implementation.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
                      >
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0 transition-colors duration-300">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer with call-to-action */}
      <div className="bg-blue-50 dark:bg-slate-700/50 p-6 text-center transition-colors duration-300">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 transition-colors duration-300">
          💡 <strong>Pro Tip:</strong> Start with the "Critical" recommendation.
          It will have the biggest impact.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300">
          Revisit metrics weekly to track progress
        </p>
      </div>
    </div>
  );
};

export default RecommendationPanel;
