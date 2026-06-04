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
        className={`w-[1.3em] h-[1.8em] border-none rounded-[5px] text-[xx-large] flex text-center bg-white text-black focus:outline-none ${
          isError ? "outline outline-[red]" : ""
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