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

    const hasAboutMeError = (tempData.aboutMe || "").length > 300;
    const hasExpDescError = (tempData.experience || []).some(exp => (exp.description || "").length > 300);

    const canSave = hasName && !hasEduError && !hasExpError && !hasAboutMeError && !hasExpDescError;
    return (
        <>
            <div 
                className="fixed bottom-10 left-1/2 z-50 flex h-20 w-300 -translate-x-1/2 items-center justify-end rounded-[0.625rem] bg-[#ffffff] shadow-[0_4px_24px_rgba(0,0,0,0.12)] max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:h-auto max-md:w-full max-md:translate-x-0 max-md:justify-center max-md:rounded-none max-md:rounded-t-[0.625rem] max-md:px-4 max-md:py-4 max-md:pb-[calc(1rem+env(safe-area-inset-bottom,0px))]" 
            >
                <div className="inline-flex items-center gap-2.5 max-md:w-full max-md:max-w-sm max-md:justify-center max-md:gap-3">
                    
                    <button 
                        className="mr-5 h-12 w-30 cursor-pointer rounded-[0.9375rem] border-none bg-transparent text-[1.1em] font-bold text-[rgb(243,9,9)] transition-all duration-300 hover:bg-[#ffcfcf] max-md:mr-0 max-md:flex-1 max-md:min-w-0" 
                        onClick={() => { setEditing(false); reset(); }}
                    >
                        Cancel
                    </button>
                    
                    <button 
                        className={`mr-5 h-12 w-63 rounded-[0.625rem] border-none text-[1.1em] font-bold bg-[#5F28CD] text-white transition-colors duration-200 hover:bg-[#3e1394] max-md:mr-0 max-md:flex-1 max-md:min-w-0 ${
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