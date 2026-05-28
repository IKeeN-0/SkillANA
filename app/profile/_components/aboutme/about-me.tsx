'use client'
import { useEditContext } from "../edit";

export default function AboutMe() {
    const { isEdit, liveData, updateTempField, tempData} = useEditContext();
    const descLength = (isEdit ? tempData.aboutMe : liveData.aboutMe)?.length || 0;

    const inputBaseClass = "text-white text-[14px] px-5 w-full rounded-[0.625rem] bg-white/5 border border-white/20 focus:outline-none focus:bg-white/10 focus:border-white/40 transition-colors duration-200 placeholder-white/40";
    
    return (
        <>
            <div id="AboutMe-container" className="text-[1.6em] font-bold ">    
                <h1>About Me</h1> 
                
                <div id="AboutMe-content" className="block mt-1 p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-325 transition-all duration-300 rounded-2xl">
                    
                    <div id="About-Me" className="block text-[0.8em] font-semibold ">
                        <div className="relative flex w-full items-center">
                            <textarea 
                                id="about-me" 
                                rows={4}
                                className={`${inputBaseClass} py-3 resize-none font-medium`}
                                placeholder="Tell us about yourself" 
                                readOnly={!isEdit}
                                value={isEdit ? (tempData.aboutMe || "") : (liveData.aboutMe || "")}
                                onChange={(e) => updateTempField("aboutMe", e.target.value)}
                            />
                        </div>
                        {isEdit && (
                                <div className="text-right text-sm text-white/50 mt-1 pr-1 font-medium">
                                    {descLength} / 300
                                </div>
                            )}    
                    </div>
                </div>
            </div>
        </>
  );
}