"use client"
import { forwardRef, ComponentPropsWithoutRef } from "react"

interface OtpInputProps extends ComponentPropsWithoutRef<"input"> {
  isError?: boolean;
}

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  ({ isError, className, ...props }, ref) => {
    return (
      <input 
        {...props} 
        ref={ref} 
        type="text" 
        className={`w-[1.2em] h-[1.6em] lg:w-[1.5em] lg:h-[2em] border-none rounded-[8px] text-2xl lg:text-4xl flex text-center bg-white text-black focus:outline-none transition-all duration-300 ${
          isError ? "outline outline-2 outline-red-500" : "focus:ring-2 focus:ring-[#5F28CD]"
        }`}
        maxLength={1} 
        inputMode="numeric" 
        pattern="[0-9]*"
      />
    )
  }
)

OtpInput.displayName = "OtpInput"

export default OtpInput;