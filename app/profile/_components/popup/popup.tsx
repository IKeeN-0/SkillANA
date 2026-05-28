'use client'
import { useEditContext } from "../edit";

export default function Popup() {  
    const { isEdit, setEditing, saveData, reset, tempData } = useEditContext();

    if (!isEdit) return null;

    // เช็คว่ากรอกชื่อและนามสกุลแล้ว
    const hasName = tempData.firstName?.trim() !== "" && tempData.lastName?.trim() !== "";

    // เช็ค Error วันที่ฝั่ง Education 
    const eduStart = tempData.education?.startDate ? new Date(tempData.education.startDate) : null;
    const eduEnd = tempData.education?.endDate ? new Date(tempData.education.endDate) : null;
    const hasEduError = eduStart && eduEnd && eduStart > eduEnd;

    // เช็ค Error วันที่ฝั่ง Experience 
    const hasExpError = (tempData.experience || []).some(exp => {
        const expStart = exp.startDate ? new Date(exp.startDate) : null;
        const expEnd = exp.endDate ? new Date(exp.endDate) : null;
        return expStart && expEnd && expStart > expEnd;
    });

    const canSave = hasName && !hasEduError && !hasExpError;

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
                            !canSave ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                        }`}
                        onClick={() => { if (canSave) { setEditing(false); saveData(); } }}
                        disabled={!canSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    )
}