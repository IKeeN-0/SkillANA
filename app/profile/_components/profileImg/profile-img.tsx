import imgstyle from './profile-img.module.css';
import style from "../../profile.module.css"
import { useEditContext } from '../edit';
import { UploadButton } from "./upload";
import { useState } from 'react';


export default function ProfileImg() {

    const {isEdit, updateTempField, tempData} = useEditContext();
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({ firstName: false, lastName: false });
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, field: "firstName" | "lastName") => {
    const val = e.target.value;
    updateTempField(field, val);
    setErrors(prev => ({ ...prev, [field]: val.trim() === "" }));
    };


    return (
        <>
        
        <div id="profile-container" className={imgstyle.profileContainer}>

                <div id="profile-img-wrapper" className={imgstyle.imgWrapper}>
                    <img src={tempData.profileImg || "user.png"} alt="Profile Picture" id="profile-img" className={imgstyle.img} />
                    <UploadButton 
                    endpoint="profileImg"
                    onUploadBegin={() => {
                        setIsUploading(true);
                    }}
                    headers={{
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                    }}
                    appearance={{
                        button : imgstyle.uploadBtn,
                        allowedContent : style.hidden,
                    }}
                    content={{
                       button : <img src="edit.png" alt="upload" className={imgstyle.overlay}></img>
                    }}
                    onClientUploadComplete={(res) => {
                        const url = res?.[0]?.ufsUrl;
                        updateTempField("profileImg", url);
                        setIsUploading(false);
                    }}
                    onUploadError={() => {
                        setIsUploading(false);
                    }}
                     />
                </div>



    <div className={imgstyle.nameWrapper}> 
    {!isEdit ? (
        <>
        <div className={imgstyle.nameRow}>
            <p className={imgstyle.firstName}>
                {tempData.firstName || "First Name"}
            </p>
            <p className={imgstyle.lastName}>
                {tempData.lastName || "Last Name"}
            </p>
            </div>
        </>
    ) : (
        <>
           <div className={imgstyle.nameWrapper}>
                <div className={imgstyle.inputGroup}>
                    <input
                        className={`${imgstyle.inputName} ${errors.firstName ? imgstyle.inputError : ""}`}
                        value={tempData.firstName || ""}
                        onChange={(e) => handleNameChange(e, "firstName")}
                        onBlur={() => setErrors(prev => ({ ...prev, firstName: !tempData.firstName?.trim() }))}
                    />
                    {errors.firstName && <p className={imgstyle.errorText}>Please enter your first name</p>}
                </div>

                <div className={imgstyle.inputGroup}>
                    <input
                        className={`${imgstyle.inputName} ${errors.lastName ? imgstyle.inputError : ""}`}
                        value={tempData.lastName || ""}
                        onChange={(e) => handleNameChange(e, "lastName")}
                        onBlur={() => setErrors(prev => ({ ...prev, lastName: !tempData.lastName?.trim() }))}
                    />
                    {errors.lastName && <p className={imgstyle.errorText}>Please enter your last name</p>}
                </div>
            </div>
                    </>
                )}
            </div>
                        </div>
        </>
    )
}