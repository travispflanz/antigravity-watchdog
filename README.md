# Antigravity Watchdog 🐕

**Automated Monitoring for your AI Workflow**

Antigravity Watchdog is a specialized tool designed to monitor local and cloud-based AI environments. It uses Playwright to autonomously observe application states, detect quota errors or specific UI conditions, and capture evidence (screenshots/logs) for review.

## Features

- **24/7 Monitoring**: Runs silently in the background.
- **Quota Detection**: Automatically spots "Quota Exceeded" or rate-limit messages.
- **Evidence Capture**: Saves timestamped screenshots of error states.
- **Logging**: Detailed activity log for debugging workflow interruptions.

## Installation

```bash
git clone https://github.com/StartYourAI/antigravity-watchdog.git
cd antigravity-watchdog
npm install
```

## Usage

1. **Configure**: Create a `.env` file (optional) to set your target URL.
   ```
   ANTIGRAVITY_URL=http://localhost:3000
   ```
2. **Run**:
   ```bash
   node watchdog.js
   ```

## Why use this?

This tool is part of the **Antigravity AI Ecosystem**, ensuring that your automated AI agents utilize their resources efficiently. By detecting downtime or quota exhaustion immediately, you can switch models or providers without losing time.

## License

MIT
