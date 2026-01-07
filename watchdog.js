const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Configuration
const ANTIGRAVITY_URL = process.env.ANTIGRAVITY_URL || "http://localhost:3000"; // Default, adjust if needed
const CHECK_INTERVAL_MS = 60000; // Check every 1 minute
const SCREENSHOT_DIR = path.join(__dirname, "screenshots");
const LOG_FILE = path.join(__dirname, "watchdog.log");

// Ensure directories exist
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR);
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] ${message}`;
  console.log(logMsg);
  fs.appendFileSync(LOG_FILE, logMsg + "\n");
}

async function startWatchdog() {
  log("🚀 Antigravity Watchdog Started");

  let browser;
  try {
    browser = await chromium.launch({ headless: true }); // Run headless for background monitoring
    const page = await browser.newPage();

    // Initial Load
    log(`Navigating to ${ANTIGRAVITY_URL}`);
    try {
      await page.goto(ANTIGRAVITY_URL, { timeout: 30000 });
    } catch (e) {
      log(`Error loading page: ${e.message}. Is Antigravity running?`);
      // Don't exit, just wait and retry later
    }

    // Monitoring Loop
    while (true) {
      try {
        // 1. Check for specific error messages
        // These are the selectors/text for Antigravity's quota errors
        const quotaError = await page
          .getByText(/quota exceeded|limit reached|capacity/i)
          .isVisible()
          .catch(() => false);
        const errorBanner = await page
          .locator(".error-banner")
          .isVisible()
          .catch(() => false);

        if (quotaError || errorBanner) {
          log("⚠️ QUOTA ERROR DETECTED!");

          // Take Screenshot
          const timestamp = new Date().toISOString().replace(/:/g, "-");
          const screenshotPath = path.join(
            SCREENSHOT_DIR,
            `quota-error-${timestamp}.png`
          );
          await page.screenshot({ path: screenshotPath, fullPage: true });

          log(`📸 Screenshot saved: ${screenshotPath}`);

          // Optional: Trigger alert (sound, email, etc.)
          // await playAlertSound();
        } else {
          // Heartbeat logging (optional, maybe every 10 loops)
          // log('✅ Status nominal');
        }

        // reload page periodically to refresh state if needed, or just keep monitoring dynamic elements
        // For Single Page Apps, we might not want to reload constantly.
        // Let's just check interactions if possible.
      } catch (err) {
        log(`❌ Error in monitoring loop: ${err.message}`);
      }

      // Wait interval
      await new Promise((r) => setTimeout(r, CHECK_INTERVAL_MS));
    }
  } catch (error) {
    log(`❌ Critical Watchdog Failure: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

startWatchdog();
