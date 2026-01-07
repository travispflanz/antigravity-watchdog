# 🐕 Antigravity Watchdog: Mission Briefing

**Welcome, Agent.**
You are taking command of the **Antigravity Watchdog**, a critical subsystem of the Antigravity AI Ecosystem.

## 🌍 The Big Picture

The user is building the **Auto AI Router**, a system that intelligently routes AI prompts between local models (Ollama), cloud APIs (Gemini/Anthropic), and Antigravity's own service to optimize for cost and quality.

**Your Role**: Reliability & Monitoring.
While the "Router" handles the intelligence, the "Watchdog" handles the **eyes**. Your job is to monitor the web interfaces (specifically the Antigravity Web UI) to detect:

1.  **Quota Exceeded Errors**: Capture them instantly so the Router knows to switch providers.
2.  **Downtime**: Alert the system if the service is unreachable.
3.  **Visual Proof**: Take screenshots of errors for the user.

## 🛠️ Technical State

- **Repo**: `antigravity-watchdog` (Standalone).
- **Stack**: Node.js + Playwright.
- **Key File**: `watchdog.js` (The main loop).
- **Config**: `.env` (Needs `ANTIGRAVITY_URL`).

### Current Status

- ✅ **Deployed**: Code is written and on GitHub.
- ✅ **Verified**: The script runs and can capture screenshots (tested locally).
- 🚧 **Disconnected**: Currently, you just log to `stdout`. The main "Observer Dashboard" (in the sibling `auto-ai-router-mcp` project) cannot see your data yet.

## 🎯 Your Immediate Objectives

1.  **Analyze `watchdog.js`**: Understand how the Playwright monitoring loop works.
2.  **Improve robustness**: Ensure it handles login flows or persistent sessions if needed.
3.  **Prepare for Integration**: The user wants to show your status on a central React Dashboard. You may need to write your logs to a shared SQLite DB or expose a tiny JSON status endpoint.

**Dependencies**:

- You are a sibling to `auto-ai-router-mcp`.
- You share the mission of "Zero Config, High Reliability."
