#!/usr/bin/env node

/**
 * Business Card Screenshot Script
 *
 * This script takes screenshots of both sides of the business card component
 * in the exact dimensions (1050px by 600px) and saves them in both PNG and WebP formats.
 *
 * Usage:
 *   node scripts/screenshot-business-card.js
 *
 * Requirements:
 *   - Development server running on http://localhost:4322
 *   - Playwright browser installed
 *   - cwebp binary available in bin/ directory
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOT_DIR = '.screenshots';
const DEV_SERVER_URL = 'http://localhost:4321/business-card';
const BROWSER_WIDTH = 1200;
const BROWSER_HEIGHT = 800;

async function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created directory: ${dirPath}`);
  }
}

async function checkDevServer() {
  try {
    const response = await fetch(DEV_SERVER_URL);
    if (response.ok) {
      console.log('✓ Development server is running');
      return true;
    }
  } catch (error) {
    console.log('✗ Development server is not running');
    console.log('Please start the development server with: pnpm run dev');
    return false;
  }
}

async function takeBusinessCardScreenshots() {
  console.log('🎯 Starting business card screenshot process...');

  // Ensure screenshots directory exists
  await ensureDirectoryExists(SCREENSHOT_DIR);

  // Check if dev server is running
  if (!(await checkDevServer())) {
    process.exit(1);
  }

  // Launch browser
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Set viewport size
    await page.setViewportSize({
      width: BROWSER_WIDTH,
      height: BROWSER_HEIGHT,
    });
    console.log(`✓ Set browser viewport to ${BROWSER_WIDTH}x${BROWSER_HEIGHT}`);

    // Navigate to business card page
    console.log('📄 Navigating to business card page...');
    await page.goto(DEV_SERVER_URL);
    await page.waitForLoadState('networkidle');

    // Wait for business card components to load
    await page.waitForSelector('business-card');
    console.log('✓ Business card components loaded');

    // Take screenshot of front side (first business card)
    console.log('📸 Taking screenshot of front side...');
    const frontScreenshotPath = path.join(
      SCREENSHOT_DIR,
      'business-card-front.png'
    );
    await page.locator('business-card').first().screenshot({
      path: frontScreenshotPath,
      type: 'png',
    });
    console.log(`✓ Front side saved: ${frontScreenshotPath}`);

    // Take screenshot of back side (second business card)
    console.log('📸 Taking screenshot of back side...');
    const backScreenshotPath = path.join(
      SCREENSHOT_DIR,
      'business-card-back.png'
    );
    await page.locator('business-card').nth(1).screenshot({
      path: backScreenshotPath,
      type: 'png',
    });
    console.log(`✓ Back side saved: ${backScreenshotPath}`);
  } finally {
    await browser.close();
    console.log('✓ Browser closed');
  }
}

async function convertToWebP() {
  console.log('🔄 Converting PNG files to WebP format...');

  const pngFiles = ['business-card-front.png', 'business-card-back.png'];

  const cwebpPath = path.join(__dirname, '..', 'bin', 'cwebp');

  for (const pngFile of pngFiles) {
    const inputPath = path.join(SCREENSHOT_DIR, pngFile);
    const outputPath = path.join(
      SCREENSHOT_DIR,
      pngFile.replace('.png', '.webp')
    );

    try {
      execSync(`${cwebpPath} "${inputPath}" -o "${outputPath}"`, {
        stdio: 'pipe',
      });
      console.log(`✓ Converted: ${pngFile} → ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ Failed to convert ${pngFile}:`, error.message);
    }
  }
}

async function main() {
  try {
    console.log('🎨 Business Card Screenshot Generator');
    console.log('=====================================');

    await takeBusinessCardScreenshots();
    await convertToWebP();

    console.log('\n✅ All screenshots completed successfully!');
    console.log(`📁 Files saved in: ${SCREENSHOT_DIR}/`);
    console.log('   • business-card-front.png');
    console.log('   • business-card-front.webp');
    console.log('   • business-card-back.png');
    console.log('   • business-card-back.webp');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

export { takeBusinessCardScreenshots, convertToWebP };
