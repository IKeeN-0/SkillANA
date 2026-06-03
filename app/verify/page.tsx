"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import LeftBox from "../_global_components/authen_pages/left_box"
import OtpForm from "./_components/otp_form"
import Bg from "../_global_components/background/pageBackground"

export default function Login(){
    // 1. สร้าง State มารองรับค่า Email (ค่าเริ่มต้นเป็นสายอักขระว่าง หรือหมุนโหลด)
    const [userEmail, setUserEmail] = useState("")
    
    // 2. ดึงค่าจาก sessionStorage ข้างใน useEffect เพื่อให้รันเฉพาะบน Browser เท่านั้น
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedEmail = sessionStorage.getItem("pending_email")
            if (savedEmail) {
                setUserEmail(savedEmail)
            }
        }
    }, [])
    
    return(
        <div className="relative w-full text-white">

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            {/* ปรับให้แสดงผลเป็นแบบ flex-col บนจอ iPad/โทรศัพท์ และเปลี่ยนเป็น flex-row บนจอ Laptop (lg:) */}
            <main className="relative z-10 w-full h-full flex flex-col xl:flex-row justify-center items-center xl:items-start">
                
                {/* คอมโพเนนต์ฝั่งซ้ายจะซ่อนอัตโนมัติบนหน้าจอขนาดเล็กภายในตัว left_box เอง */}
                <LeftBox></LeftBox>
                
                {/* ฝั่งขวา: บนหน้าจอมือถือและ iPad ให้ขยายเต็มกว้างขึ้น (w-[90%] หรือ w-[80%]) และจัดกึ่งกลางด้วย mx-auto */}
                {/* เมื่อเป็นหน้าจอคอมพิวเตอร์ Laptop ขึ้นไป (lg:) จะกลับไปเป็นขนาด w-[50%] ชิดข้างขวาตามโครงสร้างเดิม */}
                <section className="flex flex-col w-full xl:w-[50%] h-full items-center justify-center mx-auto mt-20 lg:my-9 px-3 sm:px-0">  
                    <h3 className="text-[1.8em] font-bold mt-[1em] xl:mt-[2em] ">OTP Verification</h3>
                
                    <div>
                        <p className="text-center text-[1em] mt-[2em] ">
                            Enter the 6 digits code we sent to<br />
                            {userEmail || "your email"} to verify
                        </p>
                    </div>
                
                    <OtpForm></OtpForm>
                
                </section>
                
            </main>
        </div>
    )
}