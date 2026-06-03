import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const maxDuration = 60; // Set timeout to 60 seconds for Vercel

export async function POST(request: NextRequest) {
  try {
    const { data, templateId } = await request.json();
    console.log("Template ID:", templateId);

    // Encode data using a browser-safe base64 method
    const jsonStr = JSON.stringify(data);
    const encodedData = Buffer.from(encodeURIComponent(jsonStr)).toString('base64');
    
    // Determine the base URL dynamically
    let origin = request.nextUrl.origin;
    if (origin.includes('localhost') && process.env.VERCEL_URL) {
      origin = `https://${process.env.VERCEL_URL}`;
    }
    
    const targetUrl = `${origin}/resume-pdf/?data=${encodedData}&template=${templateId}`;
    
    console.log("Generating PDF for URL:", targetUrl);

    let browser;
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      // Configure chromium for Vercel environment
      // Ensure we are using the correct binary and arguments
      browser = await puppeteer.launch({
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      } as any);
    } else {
      // Local development configuration
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
    
    // Set a reasonable timeout for page load
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle0',
      timeout: 45000 
    });

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

    return new NextResponse(pdf as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error Details:", error);
    return NextResponse.json({ 
      error: 'Failed to generate PDF', 
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}