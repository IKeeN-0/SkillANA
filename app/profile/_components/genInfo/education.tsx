import { useEditContext } from "../edit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/app/profile/_components/experience/experience.module.css"; 

export default function Education() {
    const {isEdit, liveData, updateNestedField, tempData} = useEditContext();
    const data = isEdit ? tempData.education : liveData.education;

    const inputBaseClass = `text-white text-[14px] px-5 w-full rounded-[0.625rem] bg-white/5 border border-white/20 focus:outline-none focus:bg-white/10 focus:border-white/40 transition-colors duration-200 placeholder-white/40 ${!isEdit ? 'cursor-default' : 'cursor-text'}`;
    
    const isPresentDate = (dateVal: any) => {
        if (!dateVal) return false;
        const selected = new Date(dateVal);
        const now = new Date();
        return (
            selected.getFullYear() > now.getFullYear() || 
            (selected.getFullYear() === now.getFullYear() && selected.getMonth() >= now.getMonth())
        );
    };

    const startDateObj = data?.startDate ? new Date(data.startDate) : null;
    const endDateObj = data?.endDate ? new Date(data.endDate) : null;
    const isDateError = startDateObj && endDateObj && startDateObj > endDateObj;

    return (
        <>
        <div id="Education-container" className="text-[1.6em] font-bold max-md:w-[90vw]">    
            <h1>Education</h1> 
            
            <div id="Education-content" className="flex flex-col gap-3 mt-1 p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-160 transition-all duration-300 rounded-2xl max-md:w-full">
                
                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <div id="Education-Level" className="block text-[0.8em] font-semibold">
                        <h2 className="mb-1">Education Level</h2>
                        <div className="relative flex w-full items-center">
                            <input 
                                type="text" 
                                id="education" 
                                className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                                placeholder="e.g., Bachelor's Degree"
                                readOnly={!isEdit}
                                value={data?.level || ""}
                                onChange={(e) => updateNestedField('education', 'level', e.target.value)}
                            />
                        </div>  
                    </div>
                        
                    <div id="Major" className="block text-[0.8em] font-semibold">
                        <h2 className="mb-1">Major</h2>
                        <div className="relative flex w-full items-center">
                            <input 
                                type="text" 
                                id="major" 
                                className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                                placeholder="e.g., Computer Science"
                                readOnly={!isEdit}
                                value={data?.major || ""}
                                onChange={(e) => updateNestedField('education', 'major', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div id="School/University" className="block text-[0.8em] font-semibold">
                    <h2 className="mb-1">School/University</h2>
                    <div className="relative flex w-full items-center">
                        <input 
                            type="text" 
                            id="school" 
                            className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                            placeholder="e.g., KMUTT"
                            readOnly={!isEdit}
                            value={data?.university || ""}
                            onChange={(e) => updateNestedField('education', 'university', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    <div id="Start-Date" className="block text-[0.8em] font-semibold">
                        <h2 className="mb-1">Start Date</h2>
                        <div className="relative flex w-full items-center">
                            <DatePicker
                                selected={startDateObj}
                                onChange={(date: Date | null) => updateNestedField('education', 'startDate', date as any)}
                                portalId="root-portal"
                                className={`${inputBaseClass} h-12.5 text-[14px] font-medium ${isDateError ? 'border-[#e71c1c]! !focus:border-[#e71c1c]' : ''} ${styles.customDatePicker || ""}`}
                                wrapperClassName="w-full"   
                                placeholderText="e.g., Aug 2020"
                                readOnly={!isEdit}
                                dateFormat="MMM yyyy"
                                showMonthYearPicker
                                isClearable
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                scrollableYearDropdown
                                yearDropdownItemNumber={10}
                            />
                        </div>
                    </div>

                    <div id="End-Date" className="block text-[0.8em] font-semibold">
                        <h2 className="mb-1">End Date</h2>
                        <div className="relative flex w-full items-center">
                            <DatePicker
                                selected={endDateObj}
                                onChange={(date: Date | null) => updateNestedField('education', 'endDate', date as any)}
                                portalId="root-portal"
                                value={data?.endDate && isPresentDate(data.endDate) ? "Present" : undefined}
                                className={`${inputBaseClass} h-12.5 text-[14px] font-medium ${isDateError ? 'border-[#e71c1c]! !focus:border-[#e71c1c]' : ''} ${styles.customDatePicker || ""}`}
                                wrapperClassName="w-full"   
                                placeholderText="e.g., May 2024"
                                readOnly={!isEdit}
                                dateFormat="MMM yyyy"
                                showMonthYearPicker
                                isClearable
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                scrollableYearDropdown
                                yearDropdownItemNumber={10}
                            />
                            <p
                                className={`absolute top-[125%] z-50 rounded-sm bg-[#e71c1c] px-3 py-1.5 text-[13px] text-white font-medium drop-shadow-md transition-all duration-300 ease-in-out whitespace-nowrap ${
                                    isDateError && isEdit
                                    ? "opacity-100 translate-y-0 scale-100 visible" 
                                    : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
                                }`}
                            >
                                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-b-[6px] border-b-[#e71c1c] border-x-[6px] border-x-transparent" />
                                Incorrect date, please update.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}
