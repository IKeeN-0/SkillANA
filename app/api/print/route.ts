import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const {data, templateId} = await request.json(); // รับข้อมูล resume จาก frontend
    console.log(templateId)
    // แปลงข้อมูลเป็น Base64 เพื่อส่งผ่าน URL (หรือจะใช้ระบบสร้าง ID ชั่วคราวเก็บลง DB ก็ได้)
    const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // ส่ง data ไปทาง URL เพื่อให้หน้าปลายทางถอดรหัสออกมาใช้
    const targetUrl = `http://localhost:3000/resume-pdf/?data=${encodedData}&template=${templateId}`;
    
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
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}