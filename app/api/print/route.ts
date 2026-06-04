import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const maxDuration = 60; // Set timeout to 60 seconds for Vercel

export async function POST(request: NextRequest) {
  let browser;
  try {
    const { data, templateId } = await request.json();
    console.log("Template ID:", templateId);

    // Encode data using a UTF-8 safe base64 method
    const jsonStr = JSON.stringify(data);
    const encodedData = Buffer.from(encodeURIComponent(jsonStr)).toString('base64');
    
    // Determine the base URL dynamically
    let origin = request.nextUrl.origin;
    if (origin.includes('localhost') && process.env.VERCEL_URL) {
      origin = `https://${process.env.VERCEL_URL}`;
    }
    
    const targetUrl = `${origin}/resume-pdf/?data=${encodedData}&template=${templateId}`;
    console.log("Generating PDF for URL:", targetUrl);

    const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;

    if (BROWSERLESS_TOKEN) {
      console.log("Connecting to Browserless.io...");
      browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
      });
    } else if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.log("Launching local chromium on Vercel...");
      browser = await puppeteer.launch({
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-zygote',
          '--single-process',
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      } as any);
    } else {
      console.log("Launching local browser for development...");
      try {
        const localPuppeteer = require('puppeteer');
        browser = await localPuppeteer.launch({ 
          headless: true,
          args: ['--no-sandbox']
        });
      } catch (e) {
        browser = await (puppeteer as any).launch({
          headless: true,
          executablePath: '/usr/bin/google-chrome',
          args: ['--no-sandbox']
        });
      }
    }

    const page = await browser.newPage();

    // Mirror browser console logs to server logs for debugging
    page.on('console', (msg : any)  => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', (err : any)=> console.error('BROWSER ERROR:', err.message));
    
    console.log("Navigating to target URL...");
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle2', // Changed to networkidle2 for better stability
      timeout: 45000 
    });

    console.log("Waiting for isDataReady flag...");
    // Increased timeout for waitForFunction just in case, but usually it should be fast
    await page.waitForFunction('window.isDataReady === true', { timeout: 30000 });
    console.log("Flag detected, capturing PDF...");

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });

    await browser.close();
    console.log("PDF generated successfully");

    return new NextResponse(pdf as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error Details:", error);
    if (browser) await browser.close();
    return NextResponse.json({ 
      error: 'Failed to generate PDF', 
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}