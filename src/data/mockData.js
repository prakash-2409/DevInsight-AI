/**
 * Mock Data - Developer Productivity Metrics
 *
 * This represents real developer metrics collected over a time period.
 * In production, this would come from your CI/CD, issue tracking, and git systems.
 */

export const mockDeveloperData = {
  developer: "Prakash Raj",
  team: "Backend Team",
  period: "Last 30 days",
  metrics: {
    // Lead Time: How long from PR opening to deployment (in days)
    // Industry benchmark: < 2 days is excellent, 2-4 is good, > 5 is concerning
    leadTime: 5.2,

    // Cycle Time: How long from starting work to completion (in days)
    // Industry benchmark: < 2 days is excellent, 2-3 is good, > 4 is slow
    cycleTime: 4.1,

    // Bug Rate: Percentage of PRs that introduce bugs
    // Industry benchmark: < 3% is excellent, 3-5% is good, > 8% is concerning
    bugRate: 8,

    // Deployment Frequency: Number of deployments per month
    // Industry benchmark: > 20 is excellent, 10-20 is good, < 5 is concerning
    deploymentFrequency: 12,

    // PR Throughput: Number of PRs merged per month
    // Industry benchmark: > 20 is good, 10-20 is average, < 5 is concerning
    prThroughput: 18,
  },
};

/**
 * Historical data for trends
 * This shows how metrics have evolved over weeks
 */
export const historicalData = [
  { week: "Week 1", leadTime: 6.5, cycleTime: 5.2, bugRate: 10, deploymentFrequency: 8 },
  { week: "Week 2", leadTime: 5.8, cycleTime: 4.9, bugRate: 9, deploymentFrequency: 10 },
  { week: "Week 3", leadTime: 5.4, cycleTime: 4.3, bugRate: 8.5, deploymentFrequency: 11 },
  { week: "Week 4", leadTime: 5.2, cycleTime: 4.1, bugRate: 8, deploymentFrequency: 12 },
];

/**
 * Industry benchmarks for comparison
 * These represent best practice targets from DORA metrics
 */
export const benchmarks = {
  leadTime: {
    target: 2,
    good: 4,
    acceptable: 6,
    unit: "days",
  },
  cycleTime: {
    target: 1,
    good: 3,
    acceptable: 5,
    unit: "days",
  },
  bugRate: {
    target: 2,
    good: 5,
    acceptable: 8,
    unit: "%",
  },
  deploymentFrequency: {
    target: 20,
    good: 10,
    acceptable: 5,
    unit: "per month",
  },
  prThroughput: {
    target: 25,
    good: 15,
    acceptable: 10,
    unit: "per month",
  },
};
