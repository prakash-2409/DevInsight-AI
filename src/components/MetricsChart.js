/**
 * MetricsChart.js
 *
 * Simple trend chart showing how metrics improve over time.
 * Visualizes the impact of recommendations.
 * Dark mode support with adaptive colors.
 */

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MetricsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Detect if dark mode is enabled
  const isDarkMode =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const chartColors = {
    gridStroke: isDarkMode ? "#4a4a4a" : "#e5e7eb",
    text: isDarkMode ? "#a0a0a0" : "#6b7280",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 mb-6 transition-colors duration-300">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
        📈 Metrics Trend
      </h2>

      {/* Lead Time & Cycle Time Trend */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          Lead Time & Cycle Time (Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.gridStroke}
            />
            <XAxis dataKey="week" stroke={chartColors.text} />
            <YAxis stroke={chartColors.text} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#fff",
                border: `1px solid ${isDarkMode ? "#404040" : "#e5e7eb"}`,
                borderRadius: "8px",
              }}
              labelStyle={{ color: isDarkMode ? "#f0f0f0" : "#000" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="leadTime"
              stroke="#3b82f6"
              name="Lead Time"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="cycleTime"
              stroke="#f59e0b"
              name="Cycle Time"
              strokeWidth={2}
              dot={{ fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bug Rate & Deployment Frequency Trend */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
          Bug Rate (%) & Deployment Frequency
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.gridStroke}
            />
            <XAxis dataKey="week" stroke={chartColors.text} />
            <YAxis yAxisId="left" stroke={chartColors.text} />
            <YAxis yAxisId="right" orientation="right" stroke={chartColors.text} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#fff",
                border: `1px solid ${isDarkMode ? "#404040" : "#e5e7eb"}`,
                borderRadius: "8px",
              }}
              labelStyle={{ color: isDarkMode ? "#f0f0f0" : "#000" }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="bugRate"
              fill="#ef4444"
              name="Bug Rate (%)"
            />
            <Bar
              yAxisId="right"
              dataKey="deploymentFrequency"
              fill="#10b981"
              name="Deployments/Month"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart;
