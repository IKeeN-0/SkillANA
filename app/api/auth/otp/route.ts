import { NextResponse } from "next/server";
import {Otp} from "@/lib/models/schema"
import dbConnect from "@/lib/db";
import nodemailer from "nodemailer";

export const sendOtpEmail = async (email: string, otpCode: string) => {
  // 1. สร้าง transporter (คอนฟิกขาออก)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS, // App Password 16 หลักจาก Google
    },
  });

  // 2. กำหนดเนื้อหาอีเมล
  const mailOptions = {
    from: `"SkillAna App Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #333;">OTP Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #007bff; letter-spacing: 5px;">${otpCode}</h1>
        <p>This code will expire in 5 minutes.</p>
        <hr />
        <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  // 3. ส่งเมลจริง
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Nodemailer error:", error);
    return { success: false, error };
  }
};


export async function POST(req: Request){
    try{
        await dbConnect();
        const {email} = await req.json();

        const existedOtp = await Otp.findOne({email});

        if(existedOtp){
            const timeDiff = Date.now() - new Date(existedOtp.createdAt).getTime();
            if (timeDiff < 60000) { // 60 วินาที
                return NextResponse.json({ message: "Please wait 1 minute before requesting again." }, { status: 429 });
            }
            
            // ถ้าเกิน 1 นาทีแล้ว แต่ยังมีของเก่าอยู่ ให้ลบตัวเก่าทิ้งเพื่อเตรียมสร้างใหม่
            await Otp.deleteOne({ email });
        }
        const randomNum = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtp = await Otp.create({
            email : email,
            otp_code: randomNum,
            createdAt: new Date(),
            isUsed: false
        })
        sendOtpEmail(email,randomNum);
        return NextResponse.json({message: "OTP has been sent to your email."}, {status: 200})
    }
    catch(err){
        console.error(err)
        return NextResponse.json({message: "Internal server error"},{status: 500})
    }
    
}