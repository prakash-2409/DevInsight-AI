/**
 * MetricCard.js
 *
 * Individual metric display component.
 * Shows the raw value, unit, status indicator, and % deviation from target.
 * Highlights worst metrics visually.
 * Dark mode support with smooth transitions.
 *
 * PRODUCT THINKING:
 * % deviation gives immediate context: "How far off are we?"
 * Shows if we're getting better or worse relative to target.
 */

import React from "react";

const MetricCard = ({ title, value, unit, benchmark, Icon, isWorst = false }) => {
  // Determine severity based on benchmark
  let statusColor = "bg-green-100 dark:bg-slate-700 border-green-300 dark:border-slate-600 text-green-700 dark:text-green-300";
  let statusText = "Excellent";
  let statusIcon = "✓";

  if (value > benchmark.acceptable) {
    statusColor = "bg-red-100 dark:bg-slate-700 border-red-300 dark:border-slate-600 text-red-700 dark:text-red-300";
    statusText = "Critical";
    statusIcon = "⚠";
  } else if (value > benchmark.good) {
    statusColor = "bg-yellow-100 dark:bg-slate-700 border-yellow-300 dark:border-slate-600 text-yellow-700 dark:text-yellow-200";
    statusText = "Warning";
    statusIcon = "!";
  }

  // For metrics where lower is better, invert the logic
  if (["Deploy Frequency", "PR Throughput"].includes(title)) {
    if (value < benchmark.acceptable) {
      statusColor = "bg-red-100 dark:bg-slate-700 border-red-300 dark:border-slate-600 text-red-700 dark:text-red-300";
      statusText = "Critical";
      statusIcon = "⚠";
    } else if (value < benchmark.good) {
      statusColor = "bg-yellow-100 dark:bg-slate-700 border-yellow-300 dark:border-slate-600 text-yellow-700 dark:text-yellow-200";
      statusText = "Warning";
      statusIcon = "!";
    }
  }

  // Calculate % deviation from target
  const isLowerBetter = ["Lead Time", "Cycle Time", "Bug Rate"].includes(title);
  let deviationPercentage = 0;
  let deviationLabel = "";

  if (isLowerBetter) {
    // For metrics where lower is better
    if (value <= benchmark.target) {
      deviationPercentage = 0;
      deviationLabel = "On target 🎯";
    } else {
      deviationPercentage = ((value - benchmark.target) / benchmark.target) * 100;
      deviationLabel = `${deviationPercentage > 0 ? "+" : ""}${deviationPercentage.toFixed(0)}% vs target`;
    }
  } else {
    // For metrics where higher is better
    if (value >= benchmark.target) {
      deviationPercentage = 0;
      deviationLabel = "On target 🎯";
    } else {
      deviationPercentage = ((benchmark.target - value) / benchmark.target) * 100;
      deviationLabel = `-${deviationPercentage.toFixed(0)}% vs target`;
    }
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md dark:shadow-lg border-l-4
      ${isWorst ? "border-l-red-600 dark:border-l-red-500 ring-2 ring-red-300 dark:ring-red-800" : "border-l-blue-500 dark:border-l-slate-600"}
      hover:shadow-lg dark:hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide transition-colors duration-300">
            {title}
            {isWorst && <span className="ml-2 text-red-600 dark:text-red-400 font-bold">⚠ WORST</span>}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">
            {typeof value === "number" ? value.toFixed(1) : value}
            <span className="text-lg text-gray-500 dark:text-gray-400 ml-1 transition-colors duration-300">
              {unit}
            </span>
          </p>
        </div>
        {Icon && <span className="text-3xl">{Icon()}</span>}
      </div>

      {/* Deviation from target */}
      <div className="mb-3 text-sm text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1 transition-colors duration-300">
          Deviation
        </p>
        <p className={`${deviationPercentage === 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} font-bold transition-colors duration-300`}>
          {deviationLabel}
        </p>
      </div>

      {/* Benchmark comparison */}
      <div className="flex justify-between items-center text-xs mb-3">
        <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
          Target: {benchmark.target}
        </span>
        <span className={`px-2 py-1 rounded font-semibold transition-all duration-300 ${statusColor}`}>
          {statusIcon} {statusText}
        </span>
      </div>

      {/* Status bar */}
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 transition-colors duration-300">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            value <= benchmark.good
              ? "bg-green-500 dark:bg-emerald-400"
              : value <= benchmark.acceptable
              ? "bg-yellow-500 dark:bg-amber-400"
              : "bg-red-500 dark:bg-red-400"
          }`}
          style={{
            width: `${Math.min((value / (benchmark.good * 2)) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
};

export default MetricCard;
