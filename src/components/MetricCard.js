/**
 * MetricCard.js
 *
 * Individual metric display component.
 * Shows the raw value, unit, and status indicator (good/warning/critical).
 * Clean, focused design - one metric per card.
 */

import React from "react";

const MetricCard = ({ title, value, unit, benchmark, Icon }) => {
  // Determine severity based on benchmark
  let statusColor = "bg-green-100 border-green-300 text-green-700";
  let statusText = "Excellent";
  let statusIcon = "✓";

  if (value > benchmark.acceptable) {
    statusColor = "bg-red-100 border-red-300 text-red-700";
    statusText = "Critical";
    statusIcon = "⚠";
  } else if (value > benchmark.good) {
    statusColor = "bg-yellow-100 border-yellow-300 text-yellow-700";
    statusText = "Warning";
    statusIcon = "!";
  }

  // For metrics where lower is better, invert the logic
  if (["Deploy Frequency", "PR Throughput"].includes(title)) {
    if (value < benchmark.acceptable) {
      statusColor = "bg-red-100 border-red-300 text-red-700";
      statusText = "Critical";
      statusIcon = "⚠";
    } else if (value < benchmark.good) {
      statusColor = "bg-yellow-100 border-yellow-300 text-yellow-700";
      statusText = "Warning";
      statusIcon = "!";
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {typeof value === "number" ? value.toFixed(1) : value}
            <span className="text-lg text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
        {Icon && <Icon className="w-8 h-8 text-blue-400" />}
      </div>

      {/* Benchmark comparison */}
      <div className="flex justify-between items-center text-xs mb-3">
        <span className="text-gray-500">Target: {benchmark.target}</span>
        <span className={`px-2 py-1 rounded font-semibold ${statusColor}`}>
          {statusIcon} {statusText}
        </span>
      </div>

      {/* Status bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            value <= benchmark.good
              ? "bg-green-500"
              : value <= benchmark.acceptable
              ? "bg-yellow-500"
              : "bg-red-500"
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
