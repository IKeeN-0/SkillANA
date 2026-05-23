import { useEditContext } from "../edit";

export default function Education() {
    const {isEdit, liveData, updateNestedField, tempData} = useEditContext();
    const data = isEdit ? tempData.education : liveData.education;

    const inputBaseClass = "text-white text-[16px] px-5 w-full rounded-[0.625rem] bg-white/5 border border-white/20 focus:outline-none focus:bg-white/10 focus:border-white/40 transition-colors duration-200 placeholder-white/40";
    
  return (
    <>
      <div id="Education-container" className="text-[1.6em] font-bold">    
        <h1>Education</h1> 
        
        <div id="Education-content" className="block mt-1 p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-160 transition-all duration-300 rounded-2xl">
            
            <div id="Education-Level" className="block text-[0.8em] font-semibold mb-3">
                <h2 className="mb-1">Education Level</h2>
                <div className="relative flex w-full items-center">
                    <input 
                        type="text" 
                        id="education" 
                        className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                        placeholder="Bachelor's Degree"
                        readOnly={!isEdit}
                        value={data?.level || ""}
                        onChange={(e) => updateNestedField('education', 'level', e.target.value)}
                    />
                </div>  
            </div>
                
            <div id="Major" className="block text-[0.8em] font-semibold mb-3">
                <h2 className="mb-1">Major</h2>
                <div className="relative flex w-full items-center">
                    <input 
                        type="text" 
                        id="major" 
                        className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                        placeholder="Computer Science"
                        readOnly={!isEdit}
                        value={data?.major || ""}
                        onChange={(e) => updateNestedField('education', 'major', e.target.value)}
                    />
                </div>
            </div>

            <div id="School/University" className="block text-[0.8em] font-semibold mb-3">
                <h2 className="mb-1">School/University</h2>
                <div className="relative flex w-full items-center">
                    <input 
                        type="text" 
                        id="school" 
                        className={`${inputBaseClass} h-12.5 text-[14px] font-medium`} 
                        placeholder="Kmutt"
                        readOnly={!isEdit}
                        value={data?.university || ""}
                        onChange={(e) => updateNestedField('education', 'university', e.target.value)}
                    />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}