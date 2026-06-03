import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const maxDuration = 60; // Set timeout to 60 seconds for Vercel

export async function POST(request: NextRequest) {
  try {
    const { data, templateId } = await request.json();
    console.log("Template ID:", templateId);

    const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');
    
    // Determine the base URL dynamically
    const origin = request.nextUrl.origin;
    const targetUrl = `${origin}/resume-pdf/?data=${encodedData}&template=${templateId}`;
    
    console.log("Generating PDF for URL:", targetUrl);

    let browser;
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      // Vercel / Production configuration
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Local development configuration
      // Note: You must have a browser installed locally (e.g., Chrome or Chromium)
      // or use the 'puppeteer' package which includes its own Chromium.
      // Since we switched to puppeteer-core, we might need to point to a local executable
      // or assume the user still has 'puppeteer' (which they do in package.json)
      // but 'puppeteer-core' is preferred for Vercel.
      try {
        const localPuppeteer = require('puppeteer');
        browser = await localPuppeteer.launch({ headless: true });
      } catch (e) {
        // Fallback if 'puppeteer' is not available or fails
        browser = await puppeteer.launch({
          headless: true,
          executablePath: '/usr/bin/google-chrome' // Common path for Linux, adjust if needed
        });
      }
    }

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdf as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: 'Failed to generate PDF', details: error.message }, { status: 500 });
  }
}