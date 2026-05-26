'use client'
import { useEditContext } from "../edit";

export default function Popup() {  
    const { isEdit, setEditing, saveData, reset, tempData } = useEditContext();

    if (!isEdit) return null;

    const isValid = tempData.firstName?.trim() !== "" && tempData.lastName?.trim() !== "";

    return (
        <>
            <div 
                className="fixed bottom-10 left-1/2 -translate-x-1/2 w-300 h-20 bg-[#ffffff] flex justify-end items-center rounded-[0.625rem]" 
            >
                <div className="inline-flex gap-2.5">
                    
                    <button 
                        className="mr-5 w-30 h-12 text-[1.1em] font-bold bg-transparent text-[rgb(243,9,9)] border-none rounded-[0.9375rem] cursor-pointer transition-all duration-300 hover:bg-[#ffcfcf]" 
                        onClick={() => { setEditing(false); reset(); }}
                    >
                        Cancel
                    </button>
                    
                    <button 
                        className={`mr-5 w-63 h-12 text-[1.1em] font-bold bg-[#5F28CD] text-white border-none rounded-[0.625rem]  transition-colors duration-200 hover:bg-[#3e1394] ${
                            !isValid ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                        }`}
                        onClick={() => { if (isValid) { setEditing(false); saveData(); } }}
                        disabled={!isValid}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    )
}