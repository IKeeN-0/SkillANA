import { NextResponse } from "next/server";
import {Otp} from "@/lib/models/schema"
import dbConnect from "@/lib/db";

export async function POST(req: Request){
    try{
        await dbConnect();
        const {email, otp_code} = await req.json();

        const otpSession = await Otp.findOne({email});
        if(!otpSession){
            
            return NextResponse.json({message: "OTP Expired or Invalid"}, {status: 400})

        }else if(otpSession.isUsed) return NextResponse.json({message: "OTP is already used"},{status: 400})

        if(otpSession.otp_code != otp_code) return NextResponse.json({message: "Invalid OTP code. Please try again."}, {status: 400})
        else{
           const updatedOtp = await Otp.findOneAndUpdate(
            { _id: otpSession._id }, // 1. เงื่อนไขที่ใช้หา (Filter)
            { isUsed: true },            // 2. ข้อมูลที่จะเปลี่ยน (Update)
            { new: true }                // 3. Option: true คือให้คืนค่าตัวที่อัปเดตแล้ว (ถ้าไม่ใส่จะคืนตัวเก่า)
            );
            if(updatedOtp) return NextResponse.json({message:"Verify OTP successfull"}, {status: 200})
            else return NextResponse.json({message: "Update failed"}, {status : 500})
        }
    }
    catch(err){
        console.error(err)
        return NextResponse.json({message: "Internal server error"},{status: 500})
    }
    
}