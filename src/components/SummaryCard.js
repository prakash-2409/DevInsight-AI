/**
 * SummaryCard.js
 *
 * SYSTEM SUMMARY - The 5-Second Briefing
 * ======================================
 * Shows overall productivity health at a glance.
 * Identifies the 2-3 biggest bottlenecks needing immediate attention.
 *
 * PRODUCT THINKING:
 * Executives and team leads need a single source of truth: "Are we healthy?"
 * This card answers that question in 5 seconds.
 * Then provides the next level of detail: "What's blocking us?"
 *
 * Design: High-level status + clear bottleneck list
 */

import React from "react";

const SummaryCard = ({ summary, criticalCount, warningCount }) => {
  if (!summary) return null;

  const getStatusBgColor = (status) => {
    if (status.includes("🔴")) return "bg-red-50 dark:bg-slate-800 border-red-200 dark:border-slate-700";
    if (status.includes("🟠")) return "bg-orange-50 dark:bg-slate-800 border-orange-200 dark:border-slate-700";
    if (status.includes("🟡")) return "bg-yellow-50 dark:bg-slate-800 border-yellow-200 dark:border-slate-700";
    return "bg-green-50 dark:bg-slate-800 border-green-200 dark:border-slate-700";
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 border-l-4
      ${getStatusBgColor(summary.status)} transition-colors duration-300 mb-8`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
            System Health Overview
          </h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {summary.status}
          </p>
        </div>
        <div className="text-right bg-white dark:bg-slate-700/50 px-4 py-3 rounded-lg transition-colors duration-300">
          <div className="flex gap-4">
            {criticalCount > 0 && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold transition-colors duration-300">
                  Critical
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 transition-colors duration-300">
                  {criticalCount}
                </p>
              </div>
            )}
            {warningCount > 0 && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold transition-colors duration-300">
                  Warning
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 transition-colors duration-300">
                  {warningCount}
                </p>
              </div>
            )}
            {criticalCount === 0 && warningCount === 0 && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold transition-colors duration-300">
                  Status
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
                  All Good
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Clue */}
      <p className="text-gray-700 dark:text-gray-300 font-medium mb-4 transition-colors duration-300">
        {summary.statusClue}
      </p>

      {/* Bottlenecks List */}
      {summary.bottlenecks.length > 0 && (
        <div className="bg-white dark:bg-slate-700/30 p-4 rounded border-l-2 border-gray-300 dark:border-slate-600 mb-4 transition-all duration-300">
          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-2 transition-colors duration-300">
            Main Bottlenecks
          </p>
          <div className="space-y-1">
            {summary.bottlenecks.map((bottleneck, idx) => (
              <p key={idx} className="text-sm text-gray-900 dark:text-white font-medium transition-colors duration-300">
                {idx + 1}. {bottleneck}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className="bg-blue-100 dark:bg-slate-700 bg-opacity-30 dark:bg-opacity-30 p-3 rounded border-l-2 border-blue-500 dark:border-blue-400 transition-all duration-300">
        <p className="text-sm text-gray-900 dark:text-white font-semibold transition-colors duration-300">
          💡 Next Step: {summary.recommendation}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
