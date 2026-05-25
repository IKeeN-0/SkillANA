"use client"
import Link from "next/link"
import LeftBox from "../_global_components/authen_pages/left_box"
import OtpForm from "./_components/otp_form"
import Bg from "../_global_components/background/pageBackground"

export default function Login(){
    const userEmail = sessionStorage.getItem("pending_email")
    
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
                        className="elative inline-block self-start text-[0.9em] ml-[9em] mb-[2em] text-gray-300 hover:text-white transition-all duration-300 ..."
                    >
                        &lt; Back
                    </Link>
                    
                    <h3 className="text-[1.8em] font-bold mt-[1em] ">OTP Verification</h3>
                
                    <div>
                        <p className="text-center text-[1em] mt-[2em] ">
                            Enter the 6 digits code we sent to<br />
                            {userEmail} to verify
                        </p>
                    </div>
                
                    <OtpForm></OtpForm>
                
                </section>
            </main> 
        </div>
    )
}