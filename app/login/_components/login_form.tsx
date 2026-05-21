'use client'
import InputComponent from "@/app/_global_components/authen_pages/login_input"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Spinner from "@/app/_global_components/authen_pages/spinner"

export default function Form(){
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [emailMessage, setEmailMessage] = useState("")
    const [passMessage, setPassMessage] = useState("")
    
    useEffect(()=>{
        localStorage.removeItem("token");
    }, []);

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
  
        if (event.key === 'Enter') {
            if (!isLoading) {
                handleSubmit();
            }
        }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);


        return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [isLoading]); // แนะนำให้เพิ่ม isLoading ใน dependency array เพื่อให้ใช้ค่าล่าสุด

    async function handleSubmit(){
        setIsLoading(true);
        const email = emailRef.current?.value
        const pass = passRef.current?.value

        if(!email && !pass){
            setEmailMessage("Plase enter an email.")
            setIsEmailError(true);
            setIsPasswordError(true);
            setPassMessage("Plase enter an password.")
            setIsLoading(false);
            return;
        }
        else if(!email){setEmailMessage("Plase enter an email."); setIsEmailError(true); setIsLoading(false); return;}
        else if(!pass){ setIsPasswordError(true); setPassMessage("Plase enter an password."); setIsLoading(false); return;}

        try{
            const res = await fetch("/api/auth/login",{
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password : pass}),
            })

            if(res.ok){
                const data = await res.json()
                localStorage.setItem("token",data.token)

                const otpRes = await fetch("http://localhost:3000/api/auth/otp",{
                    method : "POST",
                    headers : {"Content-Type" : "application/json"},
                    body : JSON.stringify({email: email})
                })
                
                const otpData = await otpRes.json();
                if(!otpRes.ok){
                    
                    setIsLoading(false);
                    console.error(otpData.message)
                    return;
                }else{
                    sessionStorage.setItem("pending_email",email)
                    sessionStorage.setItem("method","login")
                    router.push("/verify");
                }
            }else{
                setIsEmailError(true);
                setIsPasswordError(true);
                setEmailMessage("")
                setPassMessage("Incorrect email or password.");
            }
        }
        catch(error){
            console.error(error)
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleEmailChange = (value: string) => {
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            setEmailMessage("Invalid email format.")
            setIsEmailError(true);
        }else setIsEmailError(false);
        
    };
    const handlePasswordChange = (value: string) =>{

        if(value) setIsPasswordError(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        console.log("test")
        handleSubmit();
    }
    };
    
    return(
        <>
            {/* .container */}
            <div className="flex flex-col mt-[2em] ">
                
                <InputComponent ref={emailRef} label="Email" placeholder="Enter your email" size="medium" isPassword={false}
                    onChange={handleEmailChange} isError={isEmailError} message={emailMessage}
                />
                
                <div className="w-full mt-[0.5em] mb-[2em] ">
                    <InputComponent ref={passRef} label="Password" placeholder="Enter your password"
                     size="medium" isPassword={true} isError={isPasswordError} message={passMessage}
                     onChange={handlePasswordChange}
                     />
                    <Link 
                        href="#" 
                        className="block w-fit ml-auto text-gray-300 text-[14px] mt-[-1em] transition-all duration-200 hover:text-white hover:border-white"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="flex flex-col gap-[.8em] w-full items-center">
                    <button 
                        className="w-full h-[2.8em] flex justify-center items-center border-none rounded-[5px] bg-[#5F28CD] text-white cursor-pointer text-[large] font-bold transition-all duration-300 hover:bg-[#411c8d] hover:text-[rgb(200,199,199)]" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Login"} 
                    </button>
                    <p className="text-[.9em] "> 
                        Don't have an account? 
                        <Link 
                            href="/create-account" 
                            className="relative inline-block self-start mb-[1em] text-[#dfa8ff] font-semibold ml-[0.7em] hover:text-[#ba44ff] transition-all duration-300 
                                after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-gray-300 
                                after:opacity-0 after:translate-y-[2px] hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                        >
                            Sign up
                        </Link> 
                    </p>
                </div>
            </div>
        </>
    )
}