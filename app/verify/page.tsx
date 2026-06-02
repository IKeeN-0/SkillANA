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

            <main className="relative z-10 w-full h-full flex justify-center">
                
                <LeftBox></LeftBox>
                
                <section className="flex flex-col items-center w-[50%] mt-20 ">

                    <Link 
                        href='/' 
                        className="relative inline-block self-start text-[0.9em] mb-10 ml-[17%] text-gray-300 hover:text-white transition-all duration-300 
                                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-px after:bg-white 
                                    after:opacity-0 after:translate-y-0.5 hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                    >
                        &lt; Back
                    </Link>
                    
                    <h3 className="text-[1.8em] font-bold mt-[1em] ">OTP Verification</h3>
                
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