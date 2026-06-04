'use client'

import { useEditContext } from "../edit";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./experience.module.css" 

const getExpId = (exp : any) => String(exp._id ?? exp.id);

export default function Exp() {
    const { 
        isEdit, 
        setEditing,
        liveData, 
        tempData, 
        updateExperience, 
        addExperience, 
        removeExperience 
    } = useEditContext();

    const rawList = isEdit ? (tempData.experience || []) : (liveData.experience || []);
    const expList = rawList;
    const limitExp = expList.length >= 5;
    
    function addNewExp() {
        if (!limitExp) {
            addExperience();
            setEditing(true)
        }
    }
    
    const isPresentDate = (dateVal: any) => {
        if (!dateVal) return false;
        const selected = new Date(dateVal);
        const now = new Date();
        
        return (
            selected.getFullYear() > now.getFullYear() || 
            (selected.getFullYear() === now.getFullYear() && selected.getMonth() >= now.getMonth())
        );
    };

    const inputBaseClass = `text-white text-[14px] px-5 w-full rounded-[0.625rem] bg-white/5 border border-white/20 focus:outline-none focus:bg-white/10 focus:border-white/40 transition-colors duration-200 placeholder-white/40 font-medium ${!isEdit ? 'cursor-default' : 'cursor-text'}`;

    return (
        <div id="experience-container" className="text-[1.6em] font-bold w-full">    
            
            <div id="exp-header" className="flex justify-between items-center w-full gap-4">
                <h1>Experience {expList.length}/5</h1> 
                
                {isEdit && (
                    <div className="flex justify-end! cursor-pointer text-[1.1em]">
                        <button 
                            id="exp-add" 
                            onClick={addNewExp} 
                            className={`px-2 rounded-lg bg-transparent border-none
                                transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white/10 active:scale-90 
                                ${limitExp ? "opacity-30 cursor-not-allowed! pointer-events-none" : ""}`}
                            style={{ cursor: limitExp ? 'not-allowed' : 'pointer' }}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>

            {expList.map((exp, index) => {
                const currentId = getExpId(exp);
                const descLength = exp.description?.length || 0;

                const startDateObj = exp.startDate ? new Date(exp.startDate) : null;
                const endDateObj = exp.endDate ? new Date(exp.endDate) : null;
                const isDateError = startDateObj && endDateObj && startDateObj > endDateObj;

                return (
                    <div key={currentId} className="relative block mt-1 p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full transition-all duration-300 rounded-2xl mb-5">
                        
                        {isEdit && expList.length > 1 && (
                            <button 
                                className="absolute top-3 right-3 flex items-center cursor-pointer justify-center p-2 rounded-lg bg-transparent text-[#ff4d4f] border-none transition-all hover:bg-white/10 hover:scale-110 z-10" 
                                onClick={() => removeExperience(currentId)}
                                title="Remove Experience"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        )}

                        <div id={`experience-content-${index}`} className="flex justify-between gap-5 items-end px-2 pt-2 max-md:flex-col max-md:items-stretch">
                            
                            <div className="block w-1/2 max-md:w-full">
                                <h2 className="mb-2 text-[18px] font-bold font-['Poppins',sans-serif]">Title</h2>
                                <div className="relative flex w-full items-center">
                                    <input 
                                        type="text" 
                                        className={`${inputBaseClass} h-12.5`} 
                                        placeholder="e.g., Software Engineer" 
                                        readOnly={!isEdit}
                                        value={exp.title || ""} 
                                        onChange={(e) => updateExperience(currentId, "title", e.target.value)}
                                    />
                                </div>  
                            </div>

                            <div className="block w-1/4 max-md:w-full">
                                <h2 className="mb-2 text-[18px] font-bold font-['Poppins',sans-serif]">Start Date</h2>
                                <div className="relative flex w-full items-center">
                                    <DatePicker
                                        selected={startDateObj}
                                        onChange={(date: Date | null) => updateExperience(currentId, "startDate", date)}
                                        portalId="root-portal"
                                        className={`${inputBaseClass} h-12.5 text-[14px] font-medium ${isDateError ? 'border-[#e71c1c]! !focus:border-[#e71c1c]' : ''} ${styles.customDatePicker || ""}`}
                                        wrapperClassName="w-full"   
                                        placeholderText="e.g., Jan 2023"
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

                            <div className="block w-1/4 max-md:w-full">
                                <h2 className="mb-2 text-[18px] font-bold font-['Poppins',sans-serif]">End Date</h2>
                                <div className="relative flex w-full items-center">
                                    <DatePicker
                                        selected={endDateObj}
                                        onChange={(date: Date | null) => updateExperience(currentId, "endDate", date)}
                                        value={exp.endDate && isPresentDate(exp.endDate) ? "Present" : undefined}
                                        portalId="root-portal"
                                        className={`${inputBaseClass} h-12.5 text-[14px] font-medium ${isDateError ? 'border-[#e71c1c]! !focus:border-[#e71c1c]' : ''} ${styles.customDatePicker || ""}`}
                                        wrapperClassName="w-full"   
                                        placeholderText="e.g., Jan 2026"
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

                        <div className="block mt-4 px-2 w-full">
                            <h2 className="mb-2 text-[18px] font-bold font-['Poppins',sans-serif]">Description</h2>
                            <div className="relative flex w-full items-center">
                                <textarea 
                                    className={`${inputBaseClass} py-3 h-30 resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent ${descLength > 300 ? 'border-[#e71c1c]! !focus:border-[#e71c1c]' : ''}`}
                                    placeholder="Describe your responsibilities..." 
                                    readOnly={!isEdit}
                                    value={exp.description || ""}
                                    onChange={(e) => updateExperience(currentId, "description", e.target.value)}
                                />

                                <p
                                    className={`absolute top-[105%] z-50 rounded-sm bg-[#e71c1c] px-3 py-1.5 text-[13px] text-white font-medium drop-shadow-md transition-all duration-300 ease-in-out whitespace-nowrap ${
                                        descLength > 300 && isEdit
                                        ? "opacity-100 translate-y-0 scale-100 visible" 
                                        : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
                                    }`}
                                >
                                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-b-[6px] border-b-[#e71c1c] border-x-[6px] border-x-transparent" />
                                    Character limit exceeded.
                                </p>
                            </div>
                            
                            {isEdit && (
                                <div className={`text-right text-sm mt-1 pr-1 font-medium ${descLength > 300 ? 'text-[#e71c1c]' : 'text-white/50'}`}>
                                    {descLength} / 300
                                </div>
                            )}
                        </div>
                        
                    </div>
                );
            })}
        </div>
    );
}