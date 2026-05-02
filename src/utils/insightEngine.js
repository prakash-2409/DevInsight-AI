/**
 * INSIGHT ENGINE - The Heart of the Dashboard
 *
 * WHY INSIGHTS MATTER MORE THAN METRICS:
 * ===========================================
 * Raw metrics (5.2 days, 8% bug rate) are just data points.
 * Insights transform that data into understanding:
 *   - Data: "leadTime = 5.2"
 *   - Insight: "Your PR reviews are slower than industry standard, causing deployment delays"
 *
 * This shifts the developer mindset from reactive (I see a big number) to
 * proactive (I understand why and what to do about it).
 *
 * PRODUCT VALUE:
 * ==============
 * Without insights, developers see: "Oh my lead time is 5.2 days"
 * With insights, developers understand: "We should reduce PR review time because
 * that's our biggest bottleneck"
 *
 * This drives real behavior change and continuous improvement.
 */

import { benchmarks } from "../data/mockData";

export const generateInsights = (metrics) => {
  const insights = [];

  // INSIGHT 1: Lead Time Analysis
  // Lead time directly impacts time-to-value for customers
  // High lead time = slow feedback loop = delayed learning
  if (metrics.leadTime > benchmarks.leadTime.acceptable) {
    insights.push({
      id: "lead-time-high",
      metric: "Lead Time",
      severity: "high",
      message: `Lead time is ${metrics.leadTime} days (target: ${benchmarks.leadTime.target} days)`,
      insight: "Your code takes too long to reach production. This delays customer value and feedback.",
      impact:
        "Every day of delay means slower learning from real users and slower bug detection in production.",
      trend: "⬆️ Getting Slower",
    });
  } else if (metrics.leadTime > benchmarks.leadTime.good) {
    insights.push({
      id: "lead-time-medium",
      metric: "Lead Time",
      severity: "medium",
      message: `Lead time is ${metrics.leadTime} days (target: ${benchmarks.leadTime.target} days)`,
      insight: "Lead time is acceptable but could be optimized.",
      impact: "Faster deployments mean quicker iterations and better customer satisfaction.",
      trend: "→ Stable",
    });
  } else {
    insights.push({
      id: "lead-time-good",
      metric: "Lead Time",
      severity: "low",
      message: `Lead time is excellent at ${metrics.leadTime} days`,
      insight: "Your team deploys fast. This is a strength worth maintaining.",
      impact: "Quick feedback loops enable rapid learning and iteration.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 2: Cycle Time Analysis
  // Cycle time shows how efficiently work moves from start to completion
  // It's a sign of process friction and context switching
  if (metrics.cycleTime > benchmarks.cycleTime.acceptable) {
    insights.push({
      id: "cycle-time-high",
      metric: "Cycle Time",
      severity: "high",
      message: `Cycle time is ${metrics.cycleTime} days (target: ${benchmarks.cycleTime.target} days)`,
      insight:
        "Tasks are taking too long to complete. This indicates process friction or unclear requirements.",
      impact: "Long cycle times reduce productivity and increase context switching costs.",
      trend: "⬆️ Slowing Down",
    });
  } else if (metrics.cycleTime > benchmarks.cycleTime.good) {
    insights.push({
      id: "cycle-time-medium",
      metric: "Cycle Time",
      severity: "medium",
      message: `Cycle time is ${metrics.cycleTime} days (target: ${benchmarks.cycleTime.target} days)`,
      insight: "Moderate cycle time. There's room for improvement.",
      impact: "Reducing cycle time by 1 day could improve annual throughput significantly.",
      trend: "→ Stable",
    });
  } else {
    insights.push({
      id: "cycle-time-good",
      metric: "Cycle Time",
      severity: "low",
      message: `Cycle time is excellent at ${metrics.cycleTime} days`,
      insight: "Your team completes work efficiently.",
      impact: "Faster task completion enables more features and fixes per month.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 3: Bug Rate Analysis
  // Bug rate reflects code quality and testing practices
  // High bug rates indicate insufficient testing or review rigor
  if (metrics.bugRate > benchmarks.bugRate.acceptable) {
    insights.push({
      id: "bug-rate-high",
      metric: "Bug Rate",
      severity: "high",
      message: `Bug rate is ${metrics.bugRate}% (target: ${benchmarks.bugRate.target}%)`,
      insight:
        "High proportion of merged code introduces bugs. Quality gates are weak.",
      impact:
        "Each bug requires rework, testing, and deployment. This multiplies actual work.",
      trend: "⬆️ Quality Declining",
    });
  } else if (metrics.bugRate > benchmarks.bugRate.good) {
    insights.push({
      id: "bug-rate-medium",
      metric: "Bug Rate",
      severity: "medium",
      message: `Bug rate is ${metrics.bugRate}% (target: ${benchmarks.bugRate.target}%)`,
      insight: "Bug rate is moderate but preventable.",
      impact: "Investing in testing now prevents firefighting later.",
      trend: "→ Concerning",
    });
  } else {
    insights.push({
      id: "bug-rate-good",
      metric: "Bug Rate",
      severity: "low",
      message: `Bug rate is excellent at ${metrics.bugRate}%`,
      insight: "Your code quality is strong. Maintain these practices.",
      impact: "Low bug rates reduce technical debt and customer issues.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 4: Deployment Frequency Analysis
  // Deployment frequency shows how rapidly teams can ship value
  // High frequency enables rapid learning and risk distribution
  if (metrics.deploymentFrequency < benchmarks.deploymentFrequency.acceptable) {
    insights.push({
      id: "deployment-frequency-low",
      metric: "Deployment Frequency",
      severity: "high",
      message: `Deploying ${metrics.deploymentFrequency}x/month (target: ${benchmarks.deploymentFrequency.target}x/month)`,
      insight: "You deploy infrequently. This indicates process bottlenecks.",
      impact:
        "Infrequent deployments mean big batches, higher risk, and slow feedback loops.",
      trend: "⬇️ Too Infrequent",
    });
  } else if (metrics.deploymentFrequency < benchmarks.deploymentFrequency.good) {
    insights.push({
      id: "deployment-frequency-medium",
      metric: "Deployment Frequency",
      severity: "medium",
      message: `Deploying ${metrics.deploymentFrequency}x/month (target: ${benchmarks.deploymentFrequency.target}x/month)`,
      insight: "Deployment frequency could increase to reduce risk per deployment.",
      impact: "More frequent smaller deployments reduce blast radius of issues.",
      trend: "→ Moderate",
    });
  } else {
    insights.push({
      id: "deployment-frequency-good",
      metric: "Deployment Frequency",
      severity: "low",
      message: `Excellent deployment frequency of ${metrics.deploymentFrequency}x/month`,
      insight: "Your team ships frequently and takes calculated risks.",
      impact: "Frequent deployments enable rapid customer feedback and learning.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 5: PR Throughput Analysis
  // PR throughput shows team capacity utilization
  // It's a leading indicator of future deployment ability
  if (metrics.prThroughput < benchmarks.prThroughput.acceptable) {
    insights.push({
      id: "pr-throughput-low",
      metric: "PR Throughput",
      severity: "high",
      message: `${metrics.prThroughput} PRs/month (target: ${benchmarks.prThroughput.target} PRs/month)`,
      insight: "Low PR throughput suggests blocked or under-utilized team capacity.",
      impact:
        "Fewer PRs means less code moving through the system and slower feature delivery.",
      trend: "⬇️ Low Capacity",
    });
  } else if (metrics.prThroughput < benchmarks.prThroughput.good) {
    insights.push({
      id: "pr-throughput-medium",
      metric: "PR Throughput",
      severity: "medium",
      message: `${metrics.prThroughput} PRs/month (target: ${benchmarks.prThroughput.target} PRs/month)`,
      insight: "PR throughput is moderate. Focus on unblocking reviews.",
      impact: "Streamlining code review can significantly increase team velocity.",
      trend: "→ Below Target",
    });
  } else {
    insights.push({
      id: "pr-throughput-good",
      metric: "PR Throughput",
      severity: "low",
      message: `Strong throughput of ${metrics.prThroughput} PRs/month`,
      insight: "Your team maintains high development velocity.",
      impact: "High throughput enables rapid iteration and feature delivery.",
      trend: "✓ Excellent",
    });
  }

  return insights;
};

/**
 * Get summary insight - the one metric to focus on RIGHT NOW
 * This uses a severity + impact scoring to identify the biggest blocker
 */
export const getPriorityInsight = (insights) => {
  const severityScore = { high: 3, medium: 2, low: 1 };
  const prioritized = insights.sort(
    (a, b) => severityScore[b.severity] - severityScore[a.severity]
  );
  return prioritized[0];
};
