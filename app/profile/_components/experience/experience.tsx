'use client'

import pstyle from "../../profile.module.css"
import estyle from "./experience.module.css"
import { useEditContext } from "../edit";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


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
    
    return (
        <div id="experience-container" className={pstyle.head}>    
            <div id="exp-header" className={estyle.expHeader}>
                <h1>Experience {expList.length}/5</h1> 
                    <div className={estyle.addIcon}>
                        <h1 
                            id="exp-add" 
                            onClick={() => {addNewExp(); setEditing(true);}} 
                            className={limitExp ? estyle.disabled : ""}
                            style={{ cursor: limitExp ? 'not-allowed' : 'pointer' }}
                        >
                            +
                        </h1>
                    </div>
                
            </div>

            {expList.map((exp, index) => {
                
                const currentId = getExpId(exp);

                return (
                    <div key={currentId} className={estyle.expBox}>
                        
                        
                        {expList.length > 1 && (
                            <div className={estyle.removeBtnContainer}>
                                <button className={estyle.removeBtn} onClick={() => removeExperience(currentId)}>
                                    X
                                </button>
                            </div>
                        )}

                        <div id={`experience-content-${index}`} className={estyle.topContainer}>
                            <div className={pstyle.profileSection}>
                                <h2>Title</h2>
                                <div className={pstyle.Wrapper}>
                                    <input 
                                        type="text" 
                                        className={pstyle.profileContent} 
                                        placeholder="Software Engineer" 
                                        readOnly={!isEdit}
                                        value={exp.title || ""} 
                                        onChange={(e) => updateExperience(currentId, "title", e.target.value)}
                                    />
                                    
                                </div>  
                            </div>


 <div className={pstyle.profileSection}>
                                <h2>Start Date</h2>
                                <div className={pstyle.Wrapper}>
                                    <DatePicker
                                            selected={exp.startDate ? new Date(exp.startDate) : null}
                                            onChange={(date: Date | null) => updateExperience(currentId, "startDate", date)}

                                            className={estyle.dateContent}
                                            wrapperClassName="datePickerWrapper"   

                                            placeholderText="Jan 2023"
                                            readOnly={!isEdit}
                                            dateFormat="MMM yyyy"
                                            showMonthYearPicker
                                            isClearable
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={10}
                                            withPortal
                                            />
                                        {/*<button className={estyle.removeDate} onClick={() => }>X</button>*/}
                                </div>
 </div>

                            <div className={pstyle.profileSection}>
                                <h2>End Date</h2>
                                <div className={pstyle.Wrapper}>
                                    <DatePicker
                                            selected={exp.endDate ? new Date(exp.endDate) : null}
                                            onChange={(date: Date | null) => updateExperience(currentId, "endDate", date)}

                                            className={estyle.dateContent}
                                            wrapperClassName="datePickerWrapper"   

                                            placeholderText="Jan 2026"
                                            readOnly={!isEdit}
                                            dateFormat="MMM yyyy"
                                            showMonthYearPicker
                                            isClearable
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            scrollableYearDropdown
                                            yearDropdownItemNumber={10}

                                            withPortal
                                            />
                                </div>
                            </div>
                        </div>

                        <div className={estyle.description}>
                            <h2>Description</h2>
                            <div className={pstyle.Wrapper}>
                                <textarea 
                                    className={estyle.profileContent} 
                                    placeholder="Describe your responsibilities..." 
                                    readOnly={!isEdit}
                                    value={exp.description || ""}
                                    onChange={(e) => updateExperience(currentId, "description", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

   
    
}