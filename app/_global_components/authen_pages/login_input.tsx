'use client'
import { forwardRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import "@/app/globals.css"

interface InputProps {
    label : string;
    placeholder : string;
    size : "small" | "medium"; //small (create account) mediam (login) large (create account)
    isPassword? : boolean;
    onChange?: (value: string) => void;
    isError? : boolean;
    message? : string;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, size, isPassword = false, onChange , isError = false, message}, ref) => {

    const [showPassword,setShowPassword] = useState(false);   
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value); 
        }
    };

    const sizeClasses = {
        small: "w-[15em] h-[2.4em]",
        medium: "w-[31em] h-[2.4em]"
    };

    return (
        <div className="flex flex-col mb-[1.4em] ">
            
            <label className="text-[0.95em] font-normal">{label}</label>
            
            <div className={`relative ${sizeClasses[size]}`}>
                <input 
                    ref={ref}
                    placeholder={placeholder}
                    type={isPassword && !showPassword ? "password" : "text"}
                    className={`w-full h-full rounded-[5px] bg-white text-black pl-[1.2em] pr-[2.5em] text-[14px] focus:outline-none border-2 transition-all duration-300 ${
                        isError ? "border-2 border-red-500" : "border-transparent"
                    }`}
                    onChange={handleChange}
                />
                
                <p
                    className={`absolute left-2.5 top-[115%] z-50 rounded-sm bg-[#e71c1c] px-3 py-1.5 text-[13px] text-white font-medium drop-shadow-md transition-all duration-300 ease-in-out ${
                        isError && message
                        ? "opacity-100 translate-y-0 scale-100 visible" 
                        : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
                    }`}
                >
                    <span className="absolute -top-1.5 left-3.75 h-0 w-0 border-b-[6px] border-b-[#dc2626] border-x-[6px] border-x-transparent" />
                    
                    {message}
                </p>
                
                {isPassword && (
                    <div 
                        className="w-[1.5em] h-[1.5em] cursor-pointer absolute top-[18%] bottom-[25%] right-[1.2em]"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <Image 
                            src={showPassword ? "/eye.png" : "/eye_hidden.png"} 
                            alt="Toggle Password Visibility"
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;