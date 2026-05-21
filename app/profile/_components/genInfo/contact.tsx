import style from "../../profile.module.css"
import { useEditContext } from "../edit";

export default function Contact() {
const { isEdit, liveData,  updateNestedField, updateTempField, tempData} = useEditContext();
const data = isEdit ? tempData.contact : liveData.contact;

  return (
    <>
    <div id = "contact-container" className={style.head}  >    
            <h1 >Contact</h1> 
        <div id = "contact-content" className={style.profileBox} >
            <div id = "Email" className={style.profileSection} >
                <h2>Email</h2>
                    <div className={style.Wrapper}>
                        <input type="email" id="email" className={style.profileContent} placeholder="example@gmail.com"
                            readOnly={!isEdit}
                            value={isEdit ? (tempData.email || "") : (liveData.email || "")}
                            onChange={(e) => updateTempField('email', e.target.value) }
                         />
                       
                    </div>  
            </div>
                

            <div id = "Phone-Number" className={style.profileSection} >
                <h2>Phone Number</h2>
                <div className={style.Wrapper}>
                    <input type="tel" id="phone" className={style.profileContent} placeholder="123-456-7890"
                         readOnly={!isEdit}
                         value={data?.phoneNumber || ""}
                         onChange={(e) => updateNestedField('contact', 'phoneNumber', e.target.value) }
                    />
                    
                </div>
            </div>


            <div id = "Address" className={style.profileSection} >
                <h2>Address</h2>
                <div className={style.Wrapper}>
                    <input type="text" id="address" className={style.profileContent} placeholder="123 Main St, City, State 12345" 
                        readOnly={!isEdit}
                        value={data?.address || ""}
                        onChange={(e) => updateNestedField('contact', 'address', e.target.value) }
                    />
                    
                </div>
            </div>
        </div>
    </div>
    </>
  );
}