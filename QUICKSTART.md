# 🚀 QUICK START GUIDE

## Step 1: Install Dependencies
```bash
cd /media/prakash/New\ Volume/project\ files/Internship
npm install
```

## Step 2: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## Step 3: Explore the Dashboard

You'll see:
1. **5 Metric Cards** - Lead Time, Cycle Time, Bug Rate, Deployment Frequency, PR Throughput
2. **Insight Panel** - The main issue to focus on (currently high lead time)
3. **Recommendation Panel** - 3 prioritized actions to improve metrics
4. **Trend Chart** - How metrics have improved over 4 weeks

## Step 4: Modify Data

Edit `/src/data/mockData.js` to change:
- Developer name
- Metric values
- Historical trend data
- Industry benchmarks

## 🎯 Core Concept

**RAW DATA** → **INSIGHTS** → **ACTIONS**

This dashboard doesn't just show you're slow. It shows you *why* you're slow and *how* to fix it.

Example:
- ❌ Old: "Lead time: 5.2 days"
- ✅ New: "Code reviews take 2+ days. Response time SLA of 4 hours would cut lead time by 40%."

## 📁 Key Files to Understand

1. **`src/utils/insightEngine.js`** - The magic! Interprets metrics
2. **`src/utils/recommendationEngine.js`** - Turns insights into actions
3. **`src/components/InsightPanel.js`** - UI for key insight
4. **`src/components/RecommendationPanel.js`** - UI for recommendations
5. **`src/data/mockData.js`** - Mock developer data

## 💬 For Interviews

Talk about:
- Why insights matter more than metrics
- How you'd extend this with real data (CI/CD APIs, git, issue tracking)
- How recommendations improve developer behavior
- The product thinking behind "understanding > data"

## 🎨 Customization Ideas

- Add more developers (team view)
- Add team comparisons
- Add goal-setting features
- Integrate with Slack for reminders
- Add historical month-to-month trends
- Add drill-down into specific metrics

---

Everything is ready to run. No backend needed. All demo data is included.

Enjoy! 🚀
