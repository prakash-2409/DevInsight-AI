/**
 * Dashboard.js
 *
 * Main dashboard component that orchestrates everything:
 * 1. System Summary - overall health at a glance
 * 2. Metrics - current performance vs. targets
 * 3. Insights - what the metrics mean (with root causes)
 * 4. Recommendations - what to do about it
 * 5. Trends - are we getting better or worse?
 *
 * PRODUCT PHILOSOPHY:
 * Data → Insight → Action
 *
 * Show context (what's our health?), explain impact (why does it matter?),
 * provide actions (what should we do?).
 */

import React from "react";
import MetricCard from "./MetricCard";
import InsightPanel from "./InsightPanel";
import RecommendationPanel from "./RecommendationPanel";
import MetricsChart from "./MetricsChart";
import SummaryCard from "./SummaryCard";
import ThemeToggle from "./ThemeToggle";
import { generateInsights, getPriorityInsight, generateSystemSummary } from "../utils/insightEngine";
import { generateRecommendations } from "../utils/recommendationEngine";
import { mockDeveloperData, historicalData, benchmarks } from "../data/mockData";

// Simple icons for metrics (not using external icon library)
const MetricIcons = {
  leadTime: () => "⏱️",
  cycleTime: () => "🔄",
  bugRate: () => "🐛",
  deploymentFrequency: () => "🚀",
  prThroughput: () => "📊",
};

/**
 * Find the worst performing metric
 * Helps visually highlight where to focus
 */
const getWorstMetric = (metrics) => {
  const deviations = {
    leadTime: {
      metric: "leadTime",
      title: "Lead Time",
      value: metrics.leadTime,
      benchmark: benchmarks.leadTime,
      isLowerBetter: true,
    },
    cycleTime: {
      metric: "cycleTime",
      title: "Cycle Time",
      value: metrics.cycleTime,
      benchmark: benchmarks.cycleTime,
      isLowerBetter: true,
    },
    bugRate: {
      metric: "bugRate",
      title: "Bug Rate",
      value: metrics.bugRate,
      benchmark: benchmarks.bugRate,
      isLowerBetter: true,
    },
    deploymentFrequency: {
      metric: "deploymentFrequency",
      title: "Deploy Frequency",
      value: metrics.deploymentFrequency,
      benchmark: benchmarks.deploymentFrequency,
      isLowerBetter: false,
    },
    prThroughput: {
      metric: "prThroughput",
      title: "PR Throughput",
      value: metrics.prThroughput,
      benchmark: benchmarks.prThroughput,
      isLowerBetter: false,
    },
  };

  let worstMetric = null;
  let maxDeviation = -Infinity;

  Object.values(deviations).forEach((m) => {
    let deviation = 0;
    if (m.isLowerBetter) {
      if (m.value > m.benchmark.target) {
        deviation = ((m.value - m.benchmark.target) / m.benchmark.target) * 100;
      }
    } else {
      if (m.value < m.benchmark.target) {
        deviation = ((m.benchmark.target - m.value) / m.benchmark.target) * 100;
      }
    }
    if (deviation > maxDeviation) {
      maxDeviation = deviation;
      worstMetric = m.metric;
    }
  });

  return worstMetric;
};

const Dashboard = () => {
  const { developer, metrics, period } = mockDeveloperData;

  // Generate insights from metrics
  const insights = generateInsights(metrics);
  const priorityInsight = getPriorityInsight(insights);

  // Generate system summary (overall health)
  const systemSummary = generateSystemSummary(metrics, insights);
  const criticalCount = insights.filter((i) => i.severity === "high").length;
  const warningCount = insights.filter((i) => i.severity === "medium").length;

  // Generate recommendations from insights
  const recommendations = generateRecommendations(insights);

  // Find worst metric to highlight
  const worstMetric = getWorstMetric(metrics);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 p-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Developer Productivity Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              📊 Metrics • 🧠 Insights • 🎯 Actions
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Developer Info Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 mb-8 border-l-4 border-l-indigo-500 dark:border-l-slate-600 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {developer}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Backend Team • {period}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Overall Status
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemSummary.status}
              </p>
            </div>
          </div>
        </div>

        {/* SYSTEM SUMMARY - The 5-second briefing */}
        <SummaryCard
          summary={systemSummary}
          criticalCount={criticalCount}
          warningCount={warningCount}
        />

        {/* Main Layout: Metrics + Insights */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Left: Metrics Cards */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              📈 Your Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Lead Time"
                value={metrics.leadTime}
                unit="days"
                benchmark={benchmarks.leadTime}
                Icon={MetricIcons.leadTime}
                isWorst={worstMetric === "leadTime"}
              />
              <MetricCard
                title="Cycle Time"
                value={metrics.cycleTime}
                unit="days"
                benchmark={benchmarks.cycleTime}
                Icon={MetricIcons.cycleTime}
                isWorst={worstMetric === "cycleTime"}
              />
              <MetricCard
                title="Bug Rate"
                value={metrics.bugRate}
                unit="%"
                benchmark={benchmarks.bugRate}
                Icon={MetricIcons.bugRate}
                isWorst={worstMetric === "bugRate"}
              />
              <MetricCard
                title="Deploy Frequency"
                value={metrics.deploymentFrequency}
                unit="/month"
                benchmark={benchmarks.deploymentFrequency}
                Icon={MetricIcons.deploymentFrequency}
                isWorst={worstMetric === "deploymentFrequency"}
              />
            </div>
            <div className="mt-4">
              <MetricCard
                title="PR Throughput"
                value={metrics.prThroughput}
                unit="/month"
                benchmark={benchmarks.prThroughput}
                Icon={MetricIcons.prThroughput}
                isWorst={worstMetric === "prThroughput"}
              />
            </div>
          </div>

          {/* Right: Main Insight */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              💡 Key Insight
            </h3>
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
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-300">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            📚 About This Dashboard
          </h3>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold mb-2 text-gray-900 dark:text-white">🎯 Why We Track These:</p>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>
                  • <strong>Lead Time:</strong> Speed from idea to production
                </li>
                <li>• <strong>Cycle Time:</strong> How fast work gets done</li>
                <li>
                  • <strong>Bug Rate:</strong> Quality and testing rigor
                </li>
                <li>
                  • <strong>Deployments:</strong> Shipping frequency & risk
                  management
                </li>
                <li>
                  • <strong>PR Throughput:</strong> Team capacity & velocity
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-900 dark:text-white">🧠 This Dashboard's Purpose:</p>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>
                  ✓ System summary: What's our health?
                </li>
                <li>✓ Shows context and % deviation from targets</li>
                <li>✓ Explains root causes (why is this happening?)</li>
                <li>✓ Provides concrete actions (what do we do?)</li>
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
