/**
 * MetricsChart.js
 *
 * Simple trend chart showing how metrics improve over time.
 * Visualizes the impact of recommendations.
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">📈 Metrics Trend</h2>

      {/* Lead Time & Cycle Time Trend */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Lead Time & Cycle Time (Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="leadTime"
              stroke="#3b82f6"
              name="Lead Time"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="cycleTime"
              stroke="#f59e0b"
              name="Cycle Time"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bug Rate & Deployment Frequency Trend */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Bug Rate (%) & Deployment Frequency
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
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
