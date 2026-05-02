/**
 * Dashboard.js
 *
 * Main dashboard component that orchestrates everything:
 * 1. Display metrics
 * 2. Generate and show insights
 * 3. Generate and show recommendations
 * 4. Show trends over time
 */

import React from "react";
import MetricCard from "./MetricCard";
import InsightPanel from "./InsightPanel";
import RecommendationPanel from "./RecommendationPanel";
import MetricsChart from "./MetricsChart";
import { generateInsights, getPriorityInsight } from "../utils/insightEngine";
import { generateRecommendations, getTopRecommendation } from "../utils/recommendationEngine";
import { mockDeveloperData, historicalData, benchmarks } from "../data/mockData";

// Simple icons for metrics (not using external icon library)
const MetricIcons = {
  leadTime: () => "⏱️",
  cycleTime: () => "🔄",
  bugRate: () => "🐛",
  deploymentFrequency: () => "🚀",
  prThroughput: () => "📊",
};

const Dashboard = () => {
  const { developer, metrics, period } = mockDeveloperData;

  // Generate insights from metrics
  const insights = generateInsights(metrics);
  const priorityInsight = getPriorityInsight(insights);

  // Generate recommendations from insights
  const recommendations = generateRecommendations(insights);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Developer Productivity Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            📊 Metrics • 🧠 Insights • 🎯 Actions
          </p>
        </div>

        {/* Developer Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-l-indigo-500">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{developer}</h2>
              <p className="text-gray-600">Backend Team • {period}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Overall Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {insights.filter((i) => i.severity === "high").length > 0 ? "⚠️" : "✅"}{" "}
                {insights.filter((i) => i.severity === "high").length === 0
                  ? "Healthy"
                  : "Needs Attention"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Layout: Metrics + Insights */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Left: Metrics Cards */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Your Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Lead Time"
                value={metrics.leadTime}
                unit="days"
                benchmark={benchmarks.leadTime}
                Icon={MetricIcons.leadTime}
              />
              <MetricCard
                title="Cycle Time"
                value={metrics.cycleTime}
                unit="days"
                benchmark={benchmarks.cycleTime}
                Icon={MetricIcons.cycleTime}
              />
              <MetricCard
                title="Bug Rate"
                value={metrics.bugRate}
                unit="%"
                benchmark={benchmarks.bugRate}
                Icon={MetricIcons.bugRate}
              />
              <MetricCard
                title="Deploy Frequency"
                value={metrics.deploymentFrequency}
                unit="/month"
                benchmark={benchmarks.deploymentFrequency}
                Icon={MetricIcons.deploymentFrequency}
              />
            </div>
            <div className="mt-4">
              <MetricCard
                title="PR Throughput"
                value={metrics.prThroughput}
                unit="/month"
                benchmark={benchmarks.prThroughput}
                Icon={MetricIcons.prThroughput}
              />
            </div>
          </div>

          {/* Right: Main Insight */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Key Insight</h3>
            <InsightPanel insights={insights} priority={priorityInsight} />
          </div>
        </div>

        {/* Trends Chart */}
        <MetricsChart data={historicalData} />

        {/* Recommendations Panel */}
        <div className="mb-8">
          <RecommendationPanel recommendations={recommendations} />
        </div>

        {/* Footer with legend and notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">📚 About These Metrics</h3>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <p className="font-semibold mb-2">🎯 Why We Track These:</p>
              <ul className="space-y-1 text-xs">
                <li>• <strong>Lead Time:</strong> Speed from idea to production</li>
                <li>• <strong>Cycle Time:</strong> How fast work gets done</li>
                <li>• <strong>Bug Rate:</strong> Quality and testing rigor</li>
                <li>• <strong>Deployments:</strong> Shipping frequency & risk management</li>
                <li>• <strong>PR Throughput:</strong> Team capacity & velocity</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">🧠 What This Dashboard Does:</p>
              <ul className="space-y-1 text-xs">
                <li>✓ Shows your current performance vs. industry benchmarks</li>
                <li>✓ Explains WHY each metric matters (not just the numbers)</li>
                <li>✓ Identifies your biggest bottleneck to focus on</li>
                <li>✓ Provides concrete, prioritized actions to improve</li>
                <li>✓ Tracks progress week-over-week</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
