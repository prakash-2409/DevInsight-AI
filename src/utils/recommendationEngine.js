/**
 * RECOMMENDATION ENGINE
 *
 * Converts insights into concrete, actionable steps.
 *
 * NOT just: "Your lead time is high"
 * BUT: "Your lead time is high → implement code review SLA → reduces lead time by 30%"
 *
 * This moves developers from understanding the problem to actually fixing it.
 */

export const generateRecommendations = (insights) => {
  const recommendations = [];

  // Process each insight to generate specific recommendations
  for (const insight of insights) {
    switch (insight.id) {
      case "lead-time-high":
        recommendations.push(
          {
            id: "reduce-lead-time-1",
            priority: "critical",
            metric: "Lead Time",
            action: "Implement Code Review SLA",
            description:
              "Set a maximum 4-hour review time for PRs. Block larger PRs from being created.",
            impact: "Expected 40% reduction in lead time",
            implementation: [
              "Add automated slack reminders for pending reviews",
              "Break large features into smaller PRs (< 400 LOC)",
              "Rotate code reviewers to spread knowledge",
            ],
            effort: "1-2 days",
          },
          {
            id: "reduce-lead-time-2",
            priority: "high",
            metric: "Lead Time",
            action: "Automate Deployment Pipeline",
            description:
              "Deploy automatically to staging on PR creation. Deploy to production automatically on merge.",
            impact: "Expected 30% reduction in lead time",
            implementation: [
              "Create auto-deployment to staging in CI/CD",
              "Ensure all tests are automated",
              "Add feature flags for gradual rollout",
            ],
            effort: "2-3 days",
          },
          {
            id: "reduce-lead-time-3",
            priority: "high",
            metric: "Lead Time",
            action: "Track and Reduce Queue Time",
            description:
              "Measure: (Current lead time) - (Actual work time). Queue time is often 50%+ of lead time.",
            impact: "Expected 35% reduction in lead time",
            implementation: [
              "Track time PR is open before review starts",
              "Identify why reviews are delayed",
              "Route PRs to less-busy reviewers",
            ],
            effort: "1 day",
          }
        );
        break;

      case "lead-time-medium":
        recommendations.push({
          id: "optimize-lead-time",
          priority: "medium",
          metric: "Lead Time",
          action: "Optimize Review Process",
          description:
            "Although acceptable, optimizing from 5.2 → 3 days would significantly improve velocity.",
          impact: "Expected 40% reduction in lead time",
          implementation: [
            "Measure which PRs take longest to review",
            "Build automated tests for common issues",
            "Create review guidelines to speed up process",
          ],
          effort: "1-2 days",
        });
        break;

      case "cycle-time-high":
        recommendations.push(
          {
            id: "reduce-cycle-time-1",
            priority: "critical",
            metric: "Cycle Time",
            action: "Reduce Work in Progress (WIP)",
            description:
              "Limit concurrent tasks to 2. Finish one before starting another. Higher WIP = context switching.",
            impact: "Expected 50% reduction in cycle time",
            implementation: [
              "Set WIP limits in project management tool",
              "Have daily standup focused on blockers",
              "Celebrate task completion, not task creation",
            ],
            effort: "Process change - no dev time",
          },
          {
            id: "reduce-cycle-time-2",
            priority: "high",
            metric: "Cycle Time",
            action: "Clarify Requirements Upfront",
            description:
              "Many delays come from unclear scope. Spend 30 mins clarifying requirements saves 4 hours later.",
            impact: "Expected 35% reduction in cycle time",
            implementation: [
              "Create task acceptance criteria before work starts",
              "Document ambiguous requirements in comments",
              "Pair with product/design to clarify scope",
            ],
            effort: "Process change",
          },
          {
            id: "reduce-cycle-time-3",
            priority: "high",
            metric: "Cycle Time",
            action: "Remove Blockers Fast",
            description:
              "Track why tasks stall. Dependencies, waiting for reviews, unclear next steps?",
            impact: "Expected 25% reduction in cycle time",
            implementation: [
              "Daily 15-min standup: blocked tasks only",
              "Senior dev owns unblocking junior devs",
              "Automate dependency management",
            ],
            effort: "1 day",
          }
        );
        break;

      case "cycle-time-medium":
        recommendations.push({
          id: "optimize-cycle-time",
          priority: "medium",
          metric: "Cycle Time",
          action: "Benchmark Task Complexity",
          description:
            "Understand why similar tasks take different times. Learn from fast completions.",
          impact: "Expected 25% reduction in cycle time",
          implementation: [
            "When closing a task, note what made it slow/fast",
            "Share learnings in team retro",
            "Create templates for common tasks",
          ],
          effort: "Ongoing - no upfront cost",
        });
        break;

      case "bug-rate-high":
        recommendations.push(
          {
            id: "reduce-bugs-1",
            priority: "critical",
            metric: "Bug Rate",
            action: "Increase Test Coverage",
            description:
              "Aim for 80%+ code coverage. Each test added is one fewer production bugs.",
            impact: "Expected 60% reduction in bug rate",
            implementation: [
              "Write tests before code (TDD when possible)",
              "Set up automated coverage reports",
              "Block low-coverage PRs from merging",
            ],
            effort: "2-3 days to set up, then 15% overhead per task",
          },
          {
            id: "reduce-bugs-2",
            priority: "high",
            metric: "Bug Rate",
            action: "Mandatory Code Review for All Changes",
            description:
              "Every PR gets reviewed by someone unfamiliar with the code. Fresh eyes catch issues.",
            impact: "Expected 40% reduction in bug rate",
            implementation: [
              "Assign reviewers from different team areas",
              "Review checklist: does this break anything?",
              "Reviewer must understand the change fully",
            ],
            effort: "No dev time - process change",
          },
          {
            id: "reduce-bugs-3",
            priority: "high",
            metric: "Bug Rate",
            action: "Add Integration Tests",
            description:
              "Most bugs happen between components. Integration tests catch these before production.",
            impact: "Expected 35% reduction in bug rate",
            implementation: [
              "Create tests for API contract changes",
              "Test common user workflows end-to-end",
              "Add database migration tests",
            ],
            effort: "1-2 days",
          },
          {
            id: "reduce-bugs-4",
            priority: "medium",
            metric: "Bug Rate",
            action: "Automate Bug Detection",
            description:
              "Use linters, type checkers, and static analysis to catch bugs before code review.",
            impact: "Expected 15% reduction in bug rate",
            implementation: [
              "Enable TypeScript strict mode (if applicable)",
              "Add ESLint with security rules",
              "Run security scanning in CI/CD",
            ],
            effort: "1 day",
          }
        );
        break;

      case "bug-rate-medium":
        recommendations.push({
          id: "improve-bug-rate",
          priority: "medium",
          metric: "Bug Rate",
          action: "Analyze Recent Bugs",
          description:
            "Understand what types of bugs are being introduced. Prevent at source.",
          impact: "Expected 20% reduction in bug rate",
          implementation: [
            "Categorize recent bugs: logic vs. integration vs. config",
            "Add tests for each bug type",
            "Create linting rules to catch similar issues",
          ],
          effort: "Half day",
        });
        break;

      case "deployment-frequency-low":
        recommendations.push(
          {
            id: "increase-deployments-1",
            priority: "critical",
            metric: "Deployment Frequency",
            action: "Implement Feature Flags",
            description:
              "Deploy to production with features off. Turn them on when ready. Reduces batch size risk.",
            impact: "Expected 2x increase in deployment frequency",
            implementation: [
              "Add feature flag system to application",
              "Deploy every merged PR, hide unfinished features",
              "Document flag naming convention",
            ],
            effort: "2-3 days",
          },
          {
            id: "increase-deployments-2",
            priority: "high",
            metric: "Deployment Frequency",
            action: "Automated Deployment Pipeline",
            description:
              "If tests pass, deploy automatically. No manual approval process needed.",
            impact: "Expected 1.5x increase in deployment frequency",
            implementation: [
              "Create staging environment that mimics production",
              "Auto-deploy to staging on every commit",
              "Auto-promote to production if staging tests pass",
            ],
            effort: "2-3 days",
          },
          {
            id: "increase-deployments-3",
            priority: "high",
            metric: "Deployment Frequency",
            action: "Reduce Deployment Size",
            description:
              "Instead of 5 features per deployment, deploy 1. Smaller changes = lower risk = more frequent deployments.",
            impact: "Expected 50% increase in deployment frequency",
            implementation: [
              "Encourage micro-commits and frequent PRs",
              "Release to production multiple times per day if appropriate",
              "Use canary deployments for gradual rollout",
            ],
            effort: "Process change",
          }
        );
        break;

      case "deployment-frequency-medium":
        recommendations.push({
          id: "improve-deployment-frequency",
          priority: "medium",
          metric: "Deployment Frequency",
          action: "Identify Deployment Bottlenecks",
          description:
            "What prevents you from deploying more? Long tests? Manual approvals? Fix that.",
          impact: "Expected 50% increase in deployment frequency",
          implementation: [
            "Measure time from commit to production",
            "Break down: build time, test time, approval time",
            "Parallelize slow steps",
          ],
          effort: "1 day analysis",
        });
        break;

      case "pr-throughput-low":
        recommendations.push(
          {
            id: "increase-pr-throughput-1",
            priority: "high",
            metric: "PR Throughput",
            action: "Speed Up Code Reviews",
            description:
              "Reviews are often the bottleneck. Target 24-hour review SLA.",
            impact: "Expected 40% increase in PR throughput",
            implementation: [
              "Add Slack reminders for pending reviews",
              "Assign reviewers immediately when PR created",
              "Break large PRs into smaller reviewable chunks",
            ],
            effort: "1 day",
          },
          {
            id: "increase-pr-throughput-2",
            priority: "high",
            metric: "PR Throughput",
            action: "Unblock the Team",
            description:
              "If throughput is truly low, people might be blocked. Identify and remove blockers.",
            impact: "Expected 50% increase in PR throughput",
            implementation: [
              "Ask team: what's preventing you from creating more PRs?",
              "Remove blockers: unclear specs, dependencies, infrastructure issues",
              "Pair junior devs with seniors on complex tasks",
            ],
            effort: "Varies",
          },
          {
            id: "increase-pr-throughput-3",
            priority: "medium",
            metric: "PR Throughput",
            action: "Encourage Smaller PRs",
            description:
              "Smaller PRs get reviewed faster, test faster, and deploy faster.",
            impact: "Expected 30% increase in PR throughput",
            implementation: [
              "Create PR size guidelines (max 400 LOC)",
              "Reject large PRs, ask to split",
              "Celebrate small, focused PRs",
            ],
            effort: "Process change",
          }
        );
        break;

      case "pr-throughput-medium":
        recommendations.push({
          id: "optimize-pr-throughput",
          priority: "medium",
          metric: "PR Throughput",
          action: "Streamline Code Review",
          description:
            "Focus on quality, not just speed. But reviews should still be timely.",
          impact: "Expected 25% increase in PR throughput",
          implementation: [
            "Create code review guidelines and checklist",
            "Automate style checking (no manual comments)",
            "Use linters to catch common issues automatically",
          ],
          effort: "1 day",
        });
        break;

      default:
        break;
    }
  }

  // Sort by priority and limit to top 3-4 recommendations
  const priorityScore = { critical: 3, high: 2, medium: 1 };
  return recommendations.sort(
    (a, b) => priorityScore[b.priority] - priorityScore[a.priority]
  );
};

/**
 * Get a single top recommendation - what should the developer do RIGHT NOW?
 */
export const getTopRecommendation = (recommendations) => {
  return recommendations[0];
};
