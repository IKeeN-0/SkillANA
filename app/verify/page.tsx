"use client"
import Link from "next/link"
import LeftBox from "../_global_components/authen_pages/left_box"
import OtpForm from "./_components/otp_form"
import Bg from "../_global_components/background"

export default function Login(){
    const userEmail = sessionStorage.getItem("pending_email")
    
    return(
        <div className="relative w-full min-h-screen text-white"> 
           <main className="w-full h-[90vh] flex ">
                <div className="absolute inset-0 -z-10">
                    <Bg />
                </div>
                
                <LeftBox></LeftBox>
                
                <section className="flex flex-col items-center w-[55%] h-full pt-[2em] pb-[3em]">

                    <Link 
                        href='/' 
                        className="relative inline-block self-start text-[0.9em] ml-[15em] mb-[1em] text-gray-300 hover:text-white transition-all duration-300 
                                    after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-white 
                                    after:opacity-0 after:translate-y-[2px] hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
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