"use client"

import Link from "next/link"
import InputComponent from "@/app/_global_components/authen_pages/login_input"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation";
import Spinner from "@/app/_global_components/authen_pages/spinner"

export default function CreateAccountForm(){
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const confirmPassRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const [errors, setErrors] = useState<{
        [key: string]: [boolean, string]
    }>({
        firstName: [false, ""],
        lastName: [false, ""],
        email: [false, ""],
        password: [false, ""],
        confirmPassword: [false, ""]
    });

    async function handleSubmit() {
        setIsLoading(true);
        
        const data = {
            firstName: firstNameRef.current?.value || "",
            lastName: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passRef.current?.value || "",
            confirmPassword: confirmPassRef.current?.value || ""
        };

        let hasEmptyField = false;

        Object.entries(data).forEach(([key, value]) => {
            if (!value.trim()) {
                let msg = `Please enter your ${key}.`;
                if (key === "firstName") msg = "Please enter your first name.";
                if (key === "lastName") msg = "Please enter your last name.";
                if (key === "confirmPassword") msg = "Please enter a confirm password.";
                else if (key === "email") msg = "Please enter an email.";
                
                handleError(key, true, msg);
                hasEmptyField = true;
            }
        });

        const hasExistingError = Object.values(errors).some(v => v[0] === true);

        if (hasEmptyField || hasExistingError) {
            setIsLoading(false);
            return;
        }

        // ---  API  ---
        // const res = await fetch("",{
        //     method : "POST",
        //     headers: {"Content-Type" : "application/json"},
        //     body : JSON.stringify({firstName : data.firstName, lastName : data.lastName, email: data.email, password: data.password})
        // })

        const otpRes = await fetch("http://localhost:3000/api/auth/otp",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email: data.email})
        })

        const otpData = await otpRes.json();

        if(!otpRes.ok){
            setIsLoading(false);
            console.error(otpData.message)
            return;
        }else{
            const pendingUserRes = await fetch("http://localhost:3000/api/auth/register/pending-users",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password})
            })
            const pendingData = await pendingUserRes.json()

            if(!pendingUserRes.ok){
                setIsLoading(false);
                console.error(pendingData.message)
                return;
            }else{
                sessionStorage.setItem("pending_email", data.email)
                sessionStorage.setItem("method","register")
                router.push("/verify")
            }
        }
        // ---------------------
        setIsLoading(false);
    }

    const handleError = (name: string, isError: boolean, message: string) => {
        setErrors(prev => ({
            ...prev,
            [name]: [isError, message]
        }));
    };

    const handleOnchange = (name: string, value: string) => {
        if(value.trim()) handleError(name, false,"");
    };

    const handleEmailOnchange = (name: string, value: string) =>{
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            handleError(name, true,"Invalid email format.");
        }else handleError(name,false,"");
    }

    const validatePassword = (name: string, pass: string) => {
        const requirements = {
            length: pass.length >= 8,
            hasNumber: /[0-9]/.test(pass),
        };

        if (!requirements.length) return handleError(name, true ,"Password must be at least 8 characters long.");
        if (!requirements.hasNumber) return handleError(name, true ,"Password must contain at least one digit.");
        
        return handleError(name, false, ""); 
    };

    const handleConfirmPassword = (name: string, value : string) =>{
        if(value != passRef.current?.value) handleError(name, true, "Password is not match.")
        else handleError(name,false,"");
    }

    return (
        <>
            <section className="box-border my-18 flex h-full flex-col">
                <Link 
                    href='/' 
                    className="relative inline-block self-start text-[0.9em] mb-10 text-gray-300 hover:text-white transition-all duration-300 
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-px after:bg-white 
                                after:opacity-0 after:translate-y-0.5 hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                >
                    &lt; Back
                </Link>
                <div>
                    <h3 className="text-[1.8em] font-bold ">Create your account</h3>
                    <p className="text-large pt-[0.2em] ">Create an account so you can explore the website</p>
                </div>
                
                <div className="flex gap-[1em] mt-[2em] ">
                    <InputComponent ref={firstNameRef} label="First Name" size="small" placeholder="Somsri" 
                    isError={errors.firstName[0]} message={errors.firstName[1] } onChange={(value: string) => handleOnchange("firstName", value)}
                    />
                    <InputComponent ref={lastNameRef} label="Last Name" size="small" placeholder="Raúl"
                    isError={errors.lastName[0]} message={errors.lastName[1]} onChange={(value: string) => handleOnchange("lastName", value)}
                    />
                </div>

                <InputComponent ref={emailRef} label="Email" size="medium" placeholder="example@gmail.com" isPassword={false}
                isError={errors.email[0]} message={errors.email[1]} onChange={(value : string) => handleEmailOnchange("email",value)}
                />
                <InputComponent ref={passRef} label="Password" size="medium" placeholder="••••••••" isPassword={true}
                isError={errors.password[0]} message={errors.password[1]} onChange={(value : string) => validatePassword("password",value)}
                />
                <InputComponent ref={confirmPassRef} label="Confirm Password" size="medium" placeholder="••••••••" isPassword={true}
                isError={errors.confirmPassword[0]} message={errors.confirmPassword[1]} onChange={(value: string)=> handleConfirmPassword("confirmPassword",value)}
                />
                
                <div className="flex flex-col gap-[.5em] items-center mt-[0.7em]">
                    <button 
                        className="w-full h-[2.8em] flex justify-center items-center border-none rounded-[5px] bg-[#5F28CD] text-white cursor-pointer text-[large] font-bold transition-all duration-300 hover:bg-[#411c8d] hover:text-[rgb(200,199,199)]" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Sign up"}
                    </button>
                    
                    <p className="text-[.9em] mt-1.5 ">
                        Already have an account? 
                        <Link 
                            href="/login" 
                            className="relative inline-block self-start mb-[1em] text-[#dfa8ff] font-semibold ml-[0.7em] hover:text-[#ba44ff] transition-all duration-300 
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-px after:bg-gray-300 
                                after:opacity-0 after:translate-y-0.5 hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                        >
                            Login
                        </Link> 
                    </p>
                </div>
            </section>
        </>
    )
}