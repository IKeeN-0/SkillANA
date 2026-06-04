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
        small: "w-full sm:w-[15em] h-[2.5em] lg:h-[3em]",
        medium: "w-full sm:w-[31em] h-[2.5em] lg:h-[3em]"
    };

    return (
        <div className="flex flex-col mb-[0.8em] lg:mb-[1.2em]">
            
            <label className="text-sm lg:text-base font-medium mb-1.5">{label}</label>
            
            <div className={`relative ${sizeClasses[size]}`}>
                <input 
                    ref={ref}
                    placeholder={placeholder}
                    type={isPassword && !showPassword ? "password" : "text"}
                    className={`w-full h-full rounded-[8px] bg-white text-black pl-[1.2em] pr-[2.5em] text-base lg:text-lg focus:outline-none border-2 transition-all duration-300 ${
                        isError ? "border-2 border-red-500" : "border-transparent"
                    }`}
                    onChange={handleChange}
                />
                
                <p
                    className={`absolute left-2.5 top-[115%] z-50 rounded-sm bg-[#e71c1c] px-3 py-1.5 text-xs lg:text-sm text-white font-medium drop-shadow-md transition-all duration-300 ease-in-out ${
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
                        className="w-[1.5em] h-[1.5em] cursor-pointer absolute top-1/2 -translate-y-1/2 right-[1em]"
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