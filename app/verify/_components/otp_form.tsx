"use client"
import { useRef, useEffect, useState } from "react"
import OtpInput from "./otp_input"
import { useRouter } from "next/navigation";
import Spinner from "@/app/_global_components/authen_pages/spinner"

export default function OtpForm(){
    
    const itemsRef = useRef<(HTMLInputElement | null)[]>([]); 
    const [email, setEmail] = useState("");
    const [method, setMethod] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isResendText, setIsResendText] = useState(false);
    const [isResendErr, setIsResendErr] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const resendTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [lastResendTime, setLastResendTime] = useState(0);
    
    useEffect(() => {
        itemsRef.current[0]?.focus();
        const savedEmail = sessionStorage.getItem("pending_email");
        const savedMethod = sessionStorage.getItem("method");
        if(savedEmail && savedMethod){
            setEmail(savedEmail);
            setMethod(savedMethod)
        }else{
            router.replace('/login')
        }
    }, []);

    const handleFocusNext = (index: number) => {
        if (index < 5) {
            itemsRef.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !itemsRef.current[index]?.value && index > 0) {
            itemsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async ()=>{
        // 🛠️ เริ่มต้นโหลดและดึง Error เก่าออกก่อนเริ่มส่งใหม่
        setIsLoading(true); 
        setIsError(false);

        const otpString = itemsRef.current
        .map((input) => input?.value || "") 
        .join("");

        if (otpString.length != 6) {
            setIsError(true)
            setErrorMsg("Please enter all 6 digits.")
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/otp/verify",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email: email, otp_code : otpString})
            })
            if(!res.ok){
                setIsError(true);
                setErrorMsg("Invalid or expired OTP.")
                setIsLoading(false); 
                return;
            }else{
                if(method == "register"){
                    const regis_res = await fetch("http://localhost:3000/api/auth/register",{
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({email: email})
                    })
                    const regis_data = await regis_res.json()
                    if(!regis_res.ok){
                        console.error(regis_data.message)
                        setIsLoading(false);
                        return;
                    }else{
                        const token = regis_data.token;
                        localStorage.setItem("token",token)
                        router.push("/home");
                    }
                }else if(method == "login"){
                    const token = localStorage.getItem("token")
                    if(!token) router.replace("/login")
                    else router.push("/home")
                }
            }
        } catch (error) {
            setIsError(true);
            setErrorMsg("Connection error. Please try again.");
            setIsLoading(false);
        }
    }

    const showResendMessage = (isErr: boolean) => {
        setIsResendErr(isErr);
        setIsResendText(true);

        // ถ้าเคยกดแล้วกดซ้ำ ให้รีเซ็ตเวลา 3 วิใหม่
        if (resendTimeoutRef.current) clearTimeout(resendTimeoutRef.current);

        resendTimeoutRef.current = setTimeout(() => {
            setIsResendText(false);
        }, 3000);
    };

    const resend = async () => {
        const now = Date.now();
        //  เช็คว่ากดครั้งล่าสุดผ่านไป 1 นาที (60000 ms) หรือยัง
        if (now - lastResendTime < 60000) {
            showResendMessage(true); // แสดง Error ว่าให้รอ 1 นาที
            return;
        }

        try {
            const otpRes = await fetch("http://localhost:3000/api/auth/otp",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({email: email})
            })
            
            if(!otpRes.ok){
                showResendMessage(true);
            } else {
                setLastResendTime(Date.now()); // อัปเดตเวลาที่ส่งล่าสุด
                showResendMessage(false); // สำเร็จ
            }
        } catch (error) {
            showResendMessage(true);
        }
    }
    
    return (
        <>
            {/* เพิ่ม relative และ items-center เพื่อให้ Popup อยู่ตรงกลางกล่องพอดี */}
            <div className="relative flex flex-col mt-[5em] items-center">
                <section className="flex gap-[1em]">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <OtpInput
                            key={index}
                            ref={(el) =>{
                                if (el) itemsRef.current[index] = el;
                            }}
                            onChange={(e: any) => {
                                //  เคลียร์ Error ทันทีเมื่อแก้ OTP
                                if (isError) {
                                    setIsError(false);
                                    setErrorMsg("");
                                }

                                if(!/^[0-9]*$/.test(e.target.value)){
                                    e.target.value = "";
                                    return;
                                }
                                if (e.target.value.length === 1) {
                                    handleFocusNext(index);
                                }
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            isError={isError}
                        />
                    ))}
                </section>
                
                {/* Popup Error*/}
                <p
                    className={`absolute top-[125%] z-50 rounded-sm bg-[#e71c1c] px-3 py-1.5 text-[13px] text-white font-medium drop-shadow-md transition-all duration-300 ease-in-out ${
                        isError && errorMsg
                        ? "opacity-100 translate-y-0 scale-100 visible" 
                        : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
                    }`}
                >
                    {/* ลูกศรชี้ขึ้นตรงกลาง */}
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-b-[6px] border-b-[#e71c1c] border-x-[6px] border-x-transparent" />
                    {errorMsg}
                </p>
            </div>

            <div className="mt-[2.7em]">
                <p className="text-[0.9em]">
                    Don’t received the verification codes?
                    <button 
                        className="relative inline-block self-start mb-[1em] cursor-pointer text-[#dfa8ff] font-semibold ml-[0.7em] hover:text-[#ba44ff] transition-all duration-300 
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-px after:bg-[#ba44ff] 
                                after:opacity-0 after:translate-y-0.5 hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                        onClick={resend}
                    >
                        Resend
                    </button>
                </p>
                
                <p className={`text-[1em] pt-[0.3em] h-6 text-center font-semibold transition-opacity duration-500 ${
                    isResendText ? "opacity-100" : "opacity-0"
                } ${isResendErr ? "text-red-500" : "text-[#dfa8ff]"}`}>
                    {isResendErr ? "Please wait 1 minute before resend OTP." : "Resend OTP successfully!"}
                </p>
            </div>

            <button 
                className="w-[40%] h-[2.2em] flex justify-center items-center border-none rounded-[5px] bg-[#5F28CD] text-white cursor-pointer text-[larger] font-bold mt-[1.5em] mx-auto transition-all duration-300 hover:bg-[#411c8d] hover:text-[rgb(200,199,199)]" 
                onClick={handleSubmit}
                disabled={isLoading} 
            >
                {isLoading ? <Spinner /> : "Verify"}
            </button>
        </>
    );
}