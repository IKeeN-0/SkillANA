
import style from "../../profile.module.css"
import { useEditContext } from "../edit";

export default function Education() {
    const {isEdit, liveData, updateTempField, updateNestedField, tempData} = useEditContext();
    const data = isEdit ? tempData.education : liveData.education;
  return (
    <>
    <div id = "Education-container" className={style.head}  >    
            <h1 >Education</h1> 
        <div id = "Education-content" className={style.profileBox} >
            <div id = "Education-Level" className={style.profileSection} >
                <h2>Education Level</h2>
                    <div className={style.Wrapper}>
                        <input type="text" id="education" className={style.profileContent} placeholder="Bachelor's Degree"
                                readOnly={!isEdit}
                                value={data?.level || ""}
                                onChange={(e) => updateNestedField('education', 'level', e.target.value)}
                        />
                       
                    </div>  
            </div>
                

            <div id = "Major" className={style.profileSection} >
                <h2>Major</h2>
                <div className={style.Wrapper}>
                    <input type="text" id="major" className={style.profileContent} placeholder="Computer Science"
                                readOnly={!isEdit}
                                value={data?.major || ""}
                                onChange={(e) => updateNestedField('education', 'major', e.target.value)}
                    />
                   
                </div>
            </div>


            <div id = "School/University" className={style.profileSection} >
                <h2>School/University</h2>
                <div className={style.Wrapper}>
                    <input type="text" id="school" className={style.profileContent} placeholder="Kmutt"
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