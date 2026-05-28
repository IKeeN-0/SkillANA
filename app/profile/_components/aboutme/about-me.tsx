'use client'
import { useEditContext } from "../edit";

export default function AboutMe() {
    const { isEdit, liveData, updateTempField, tempData} = useEditContext();
    const descLength = (isEdit ? tempData.aboutMe : liveData.aboutMe)?.length || 0;

    const isDescError = descLength > 300;

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
                                className={`${inputBaseClass} py-3 resize-none font-medium ${isDescError ? 'border-[#e71c1c]! !focus:border-[#e71c1c]' : ''}`}
                                placeholder="Tell us about yourself" 
                                readOnly={!isEdit}
                                value={isEdit ? (tempData.aboutMe || "") : (liveData.aboutMe || "")}
                                onChange={(e) => updateTempField("aboutMe", e.target.value)}
                            />

                            <p
                                className={`absolute top-[105%] z-50 rounded-sm bg-[#e71c1c] px-3 py-1.5 text-[13px] text-white font-medium drop-shadow-md transition-all duration-300 ease-in-out whitespace-nowrap ${
                                    isDescError && isEdit
                                    ? "opacity-100 translate-y-0 scale-100 visible" 
                                    : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
                                }`}
                            >
                                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-b-[6px] border-b-[#e71c1c] border-x-[6px] border-x-transparent" />
                                Character limit exceeded.
                            </p>
                        </div>
                        {isEdit && (
                            <div className={`text-right text-sm mt-1 pr-1 font-medium ${isDescError ? 'text-[#e71c1c]' : 'text-white/50'}`}>
                                {descLength} / 300
                            </div>
                        )}    
                    </div>
                </div>
            </div>
        </>
  );
}