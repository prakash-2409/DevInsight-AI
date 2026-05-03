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
  const leadTimeDeviation = calculateDeviation(metrics.leadTime, benchmarks.leadTime.target, true);
  if (metrics.leadTime > benchmarks.leadTime.acceptable) {
    insights.push({
      id: "lead-time-high",
      metric: "Lead Time",
      severity: "high",
      message: `${metrics.leadTime} days vs ${benchmarks.leadTime.target} target (${leadTimeDeviation.label})`,
      insight: `Lead time is 160%+ higher than industry standard. Your code takes ${metrics.leadTime} days to reach production vs. 2-day target. This means slower customer feedback and delayed bug detection.`,
      rootCause: "Likely causes: Slow code review process, large unreviewed PRs, manual approval gates, or infrastructure deployments.",
      impact: "Every 1-day delay = ~4% slower time-to-value for customers. Weekly impact compounds rapidly.",
      trend: "⬆️ Getting Slower",
    });
  } else if (metrics.leadTime > benchmarks.leadTime.good) {
    insights.push({
      id: "lead-time-medium",
      metric: "Lead Time",
      severity: "medium",
      message: `${metrics.leadTime} days vs ${benchmarks.leadTime.target} target (${leadTimeDeviation.label})`,
      insight: `Lead time is acceptable but 50-100% higher than ideal. At ${metrics.leadTime} days, there's opportunity to improve.`,
      rootCause: "Likely: Some PRs wait too long for review, or deployment process has room for automation.",
      impact: "Reducing by 1 day would significantly improve team velocity and customer satisfaction.",
      trend: "→ Stable",
    });
  } else {
    insights.push({
      id: "lead-time-good",
      metric: "Lead Time",
      severity: "low",
      message: `Excellent: ${metrics.leadTime} days (target: ${benchmarks.leadTime.target} days)`,
      insight: "Your team deploys fast. This is a competitive advantage worth maintaining.",
      rootCause: "Your review process and deployment pipeline are efficient.",
      impact: "Quick feedback loops enable rapid learning and competitive iteration.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 2: Cycle Time Analysis
  // Cycle time shows how efficiently work moves from start to completion
  // It's a sign of process friction and context switching
  const cycleTimeDeviation = calculateDeviation(metrics.cycleTime, benchmarks.cycleTime.target, true);
  if (metrics.cycleTime > benchmarks.cycleTime.acceptable) {
    insights.push({
      id: "cycle-time-high",
      metric: "Cycle Time",
      severity: "high",
      message: `${metrics.cycleTime} days vs ${benchmarks.cycleTime.target} target (${cycleTimeDeviation.label})`,
      insight: `Tasks take 4+ days to complete vs. 1-day target. This indicates process friction, unclear specs, or context switching overhead.`,
      rootCause: "Common causes: Unclear requirements, waiting for dependencies, multi-tasking, or blocked code reviews.",
      impact: "Each additional day of cycle time costs ~10% team productivity. This compounds quickly.",
      trend: "⬆️ Slowing Down",
    });
  } else if (metrics.cycleTime > benchmarks.cycleTime.good) {
    insights.push({
      id: "cycle-time-medium",
      metric: "Cycle Time",
      severity: "medium",
      message: `${metrics.cycleTime} days vs ${benchmarks.cycleTime.target} target (${cycleTimeDeviation.label})`,
      insight: "Moderate cycle time. There's opportunity to streamline the process.",
      rootCause: "Some tasks take longer than necessary. Investigate slow tasks to find patterns.",
      impact: "Reducing cycle time by 1 day could improve annual throughput by 20%+.",
      trend: "→ Stable",
    });
  } else {
    insights.push({
      id: "cycle-time-good",
      metric: "Cycle Time",
      severity: "low",
      message: `Excellent: ${metrics.cycleTime} days (target: ${benchmarks.cycleTime.target} days)`,
      insight: "Your team completes work efficiently with minimal process friction.",
      rootCause: "Your team has clear specs, minimal context switching, and good task focus.",
      impact: "Faster task completion enables more features and fixes per month.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 3: Bug Rate Analysis
  // Bug rate reflects code quality and testing practices
  // High bug rates indicate insufficient testing or review rigor
  const bugRateDeviation = calculateDeviation(metrics.bugRate, benchmarks.bugRate.target, true);
  if (metrics.bugRate > benchmarks.bugRate.acceptable) {
    insights.push({
      id: "bug-rate-high",
      metric: "Bug Rate",
      severity: "high",
      message: `${metrics.bugRate}% vs ${benchmarks.bugRate.target}% target (${bugRateDeviation.label})`,
      insight: `Bug rate is critically high at ${metrics.bugRate}% vs. 2% target. This means 1 in ~12 PRs introduces bugs. Quality gates are weak.`,
      rootCause: "Likely: Low test coverage, insufficient code review rigor, or inadequate pre-release testing.",
      impact: "Each bug requires rework, testing, deployment, and monitoring. This multiplies actual work by 3-5x.",
      trend: "⬆️ Quality Declining",
    });
  } else if (metrics.bugRate > benchmarks.bugRate.good) {
    insights.push({
      id: "bug-rate-medium",
      metric: "Bug Rate",
      severity: "medium",
      message: `${metrics.bugRate}% vs ${benchmarks.bugRate.target}% target (${bugRateDeviation.label})`,
      insight: `Bug rate is moderate but above best practices. At ${metrics.bugRate}%, you're introducing bugs 2-3x more frequently than necessary.`,
      rootCause: "Some PRs slip through without adequate testing or review.",
      impact: "Investing in testing now prevents exponential firefighting later.",
      trend: "→ Concerning",
    });
  } else {
    insights.push({
      id: "bug-rate-good",
      metric: "Bug Rate",
      severity: "low",
      message: `Excellent: ${metrics.bugRate}% (target: ${benchmarks.bugRate.target}%)`,
      insight: "Your code quality is strong. Maintain these testing and review practices.",
      rootCause: "Strong testing culture and rigorous code review process.",
      impact: "Low bug rates reduce technical debt and customer issues. Good ROI on quality investment.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 4: Deployment Frequency Analysis
  // Deployment frequency shows how rapidly teams can ship value
  // High frequency enables rapid learning and risk distribution
  const deploymentFrequencyDeviation = calculateDeviation(
    metrics.deploymentFrequency,
    benchmarks.deploymentFrequency.target,
    false
  );
  if (metrics.deploymentFrequency < benchmarks.deploymentFrequency.acceptable) {
    insights.push({
      id: "deployment-frequency-low",
      metric: "Deployment Frequency",
      severity: "high",
      message: `${metrics.deploymentFrequency}x/month vs ${benchmarks.deploymentFrequency.target}x/month target (${deploymentFrequencyDeviation.label})`,
      insight: `You deploy ${metrics.deploymentFrequency}x/month vs. 20x/month industry standard. This indicates significant bottlenecks in your release process.`,
      rootCause: "Likely: Manual deployment approvals, long test cycles, feature dependencies, or deployment infrastructure constraints.",
      impact: "Infrequent deployments = big batches = higher risk per release = slower feedback. You're operating at high risk.",
      trend: "⬇️ Too Infrequent",
    });
  } else if (metrics.deploymentFrequency < benchmarks.deploymentFrequency.good) {
    insights.push({
      id: "deployment-frequency-medium",
      metric: "Deployment Frequency",
      severity: "medium",
      message: `${metrics.deploymentFrequency}x/month vs ${benchmarks.deploymentFrequency.target}x/month target (${deploymentFrequencyDeviation.label})`,
      insight: `Deployment frequency is moderate. You could increase to reduce risk and accelerate feedback.`,
      rootCause: "Some process friction preventing more frequent releases.",
      impact: "More frequent smaller deployments reduce blast radius of issues by 50%+.",
      trend: "→ Moderate",
    });
  } else {
    insights.push({
      id: "deployment-frequency-good",
      metric: "Deployment Frequency",
      severity: "low",
      message: `Excellent: ${metrics.deploymentFrequency}x/month (target: ${benchmarks.deploymentFrequency.target}x/month)`,
      insight: "Your team ships frequently and takes calculated risks. This is a strength.",
      rootCause: "Automated deployment pipeline, good test coverage, and feature flags enable safe frequent releases.",
      impact: "Frequent deployments enable rapid customer feedback and learning.",
      trend: "✓ Excellent",
    });
  }

  // INSIGHT 5: PR Throughput Analysis
  // PR throughput shows team capacity utilization
  // It's a leading indicator of future deployment ability
  const prThroughputDeviation = calculateDeviation(
    metrics.prThroughput,
    benchmarks.prThroughput.target,
    false
  );
  if (metrics.prThroughput < benchmarks.prThroughput.acceptable) {
    insights.push({
      id: "pr-throughput-low",
      metric: "PR Throughput",
      severity: "high",
      message: `${metrics.prThroughput} PRs/month vs ${benchmarks.prThroughput.target}x/month target (${prThroughputDeviation.label})`,
      insight: `Only ${metrics.prThroughput} PRs/month suggests the team is significantly blocked or under-utilized on development work.`,
      rootCause: "Possible: Unclear specs, dependency bottlenecks, infrastructure issues, or team capacity constraints.",
      impact: "Fewer PRs = less code flowing through = slower feature delivery and reduced ability to respond to bugs.",
      trend: "⬇️ Low Capacity",
    });
  } else if (metrics.prThroughput < benchmarks.prThroughput.good) {
    insights.push({
      id: "pr-throughput-medium",
      metric: "PR Throughput",
      severity: "medium",
      message: `${metrics.prThroughput} PRs/month vs ${benchmarks.prThroughput.target}x/month target (${prThroughputDeviation.label})`,
      insight: "PR throughput is moderate. Focus on unblocking reviews to increase velocity.",
      rootCause: "Code review is likely the bottleneck slowing PR completion.",
      impact: "Streamlining code review can significantly increase team velocity.",
      trend: "→ Below Target",
    });
  } else {
    insights.push({
      id: "pr-throughput-good",
      metric: "PR Throughput",
      severity: "low",
      message: `Strong: ${metrics.prThroughput} PRs/month (target: ${benchmarks.prThroughput.target}x/month)`,
      insight: "Your team maintains high development velocity. Strong throughput is a team strength.",
      rootCause: "Quick reviews, clear requirements, and minimal blockers enable high PR flow.",
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

/**
 * SYSTEM SUMMARY - High-Level Health Overview
 * =============================================
 * Generates a single paragraph summarizing overall productivity health.
 * Identifies the 2-3 biggest bottlenecks that need immediate attention.
 *
 * This is the "5-second briefing" - what's the TLDR on our health?
 *
 * Example output:
 * "Overall: Moderate productivity. Main bottlenecks: Deployment Frequency (Critical),
 *  Bug Rate (Warning). Fixing these 2 issues could improve velocity by ~35%."
 */
export const generateSystemSummary = (metrics, insights) => {
  const criticalInsights = insights.filter((i) => i.severity === "high");
  const warningInsights = insights.filter((i) => i.severity === "medium");

  // Overall health status
  let overallStatus = "✅ Healthy";
  let statusClue = "Productivity is strong across all metrics";

  if (criticalInsights.length >= 2) {
    overallStatus = "🔴 Critical";
    statusClue = "Multiple critical bottlenecks need immediate attention";
  } else if (criticalInsights.length === 1 && warningInsights.length >= 1) {
    overallStatus = "🟠 Concerning";
    statusClue = "One critical and several areas need improvement";
  } else if (criticalInsights.length === 1) {
    overallStatus = "🟡 Notice";
    statusClue = "One metric needs urgent attention";
  } else if (warningInsights.length >= 2) {
    overallStatus = "🟡 Moderate";
    statusClue = "Multiple areas could use optimization";
  } else if (warningInsights.length === 1) {
    overallStatus = "🟢 Good";
    statusClue = "Mostly healthy with one area to watch";
  }

  // Build list of bottlenecks
  const bottlenecks = [...criticalInsights, ...warningInsights]
    .slice(0, 3)
    .map((i) => `${i.metric} (${i.severity === "high" ? "🔴 Critical" : "🟡 Warning"})`);

  return {
    status: overallStatus,
    statusClue,
    bottlenecks,
    recommendation: `Focus on: ${bottlenecks.join(", ")} to unlock productivity gains.`,
  };
};

/**
 * CALCULATE DEVIATION - Show how far off we are from target
 * =========================================================
 * Returns the % deviation from target, with contextual messaging.
 * Helps developers understand severity at a glance.
 *
 * Examples:
 * - Lead time 5.2 vs target 2 = 160% higher = CRITICAL
 * - Bug rate 8% vs target 2% = 300% higher = CRITICAL
 * - Deployment freq 12 vs target 20 = 40% lower = WARNING
 */
export const calculateDeviation = (actual, target, isLowerBetter = false) => {
  if (isLowerBetter) {
    // For metrics where lower is better (lead time, cycle time, bug rate)
    if (actual <= target) {
      return {
        percentage: 0,
        direction: "better",
        label: "On Target 🎯",
      };
    }
    const deviation = ((actual - target) / target) * 100;
    if (deviation > 150) {
      return { percentage: deviation, direction: "worse", label: `${Math.round(deviation)}% Higher 🔴` };
    } else if (deviation > 50) {
      return { percentage: deviation, direction: "worse", label: `${Math.round(deviation)}% Higher 🟡` };
    }
    return { percentage: deviation, direction: "worse", label: `${Math.round(deviation)}% Higher` };
  } else {
    // For metrics where higher is better (deployment frequency, PR throughput)
    if (actual >= target) {
      return {
        percentage: 0,
        direction: "better",
        label: "On Target 🎯",
      };
    }
    const deviation = ((target - actual) / target) * 100;
    if (deviation > 50) {
      return { percentage: deviation, direction: "worse", label: `${Math.round(deviation)}% Below Target 🔴` };
    } else if (deviation > 25) {
      return { percentage: deviation, direction: "worse", label: `${Math.round(deviation)}% Below Target 🟡` };
    }
    return { percentage: deviation, direction: "worse", label: `${Math.round(deviation)}% Below Target` };
  }
};

/**
 * ENHANCED INSIGHTS - Add deviation data to each insight
 * ======================================================
 * This gives insights richer context for better decision-making.
 */
export const generateInsightsWithDeviation = (metrics) => {
  const baseInsights = generateInsights(metrics);

  return baseInsights.map((insight) => {
    let deviation = { percentage: 0, direction: "neutral", label: "" };
    let benchmark = benchmarks[insight.id.replace("-high", "").replace("-medium", "").replace("-good", "")];

    // Map insight ID to metric name
    const metricKey = insight.id.replace(/-high|-medium|-good/, "");
    if (benchmarks[metricKey]) {
      benchmark = benchmarks[metricKey];
      const isLowerBetter = ["leadTime", "cycleTime", "bugRate"].includes(metricKey);
      const actual = metrics[metricKey];
      deviation = calculateDeviation(actual, benchmark.target, isLowerBetter);
    }

    return {
      ...insight,
      deviation,
    };
  });
};
