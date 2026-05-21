'use client'
import astyle from "./about-me.module.css"
import pstyle from "../../profile.module.css";

import { useEditContext } from "../edit";
export default function AboutMe() {
    const { isEdit, liveData, updateTempField, tempData} = useEditContext();
   
    return (
        <>
    <div id = "AboutMe-container" className={pstyle.head}  >    
            <h1 >About Me</h1> 
        <div id = "AboutMe-content" className={astyle.aboutMeBox} >
            <div id = "About-Me" className={pstyle.profileSection} >
                
                    <div className={pstyle.Wrapper}>
                        <textarea 
                            id="about-me" 
                            className={astyle.aboutMe} 
                            placeholder="Tell us about yourself" 
                            readOnly={!isEdit}
                            value={isEdit ? (tempData.aboutMe || "") : (liveData.aboutMe || "")}
                            onChange={(e) => updateTempField("aboutMe", e.target.value)}
                        />
                        
                    </div>  
            </div>
        </div>
    </div>
    </>
  );
}