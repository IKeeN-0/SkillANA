import { useEditContext } from '../edit';
import { UploadButton } from "./upload";
import { useState } from 'react';
import Image from 'next/image';

export default function ProfileImg() {
    const {isEdit, updateTempField, tempData} = useEditContext();
    const [, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({ firstName: false, lastName: false });
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, field: "firstName" | "lastName") => {
        const val = e.target.value;
        updateTempField(field, val);
        setErrors(prev => ({ ...prev, [field]: val.trim() === "" }));
    };

    const inputBaseClass = "w-full h-11 text-[1em] text-white font-medium bg-white/5 border border-white/20 rounded-[8px] px-4 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all duration-300 placeholder-white/40";
    const labelClass = "block font-semibold mb-1 text-[1.5em] text-white";

    return (
        <>
            <div id="profile-container" className="relative w-[31%] h-50 flex items-center gap-10 max-md:w-full max-md:h-auto max-md:flex-col max-md:text-center max-md:py-4">

                <div 
                    id="profile-img-wrapper" 
                    className="group relative shrink-0 w-36 h-36 rounded-full overflow-hidden flex items-center justify-center border-2 border-solid border-[#ffffff99] [&>div]:absolute [&>div]:top-0 [&>div]:left-0 [&>div]:w-full [&>div]:h-full [&>div]:rounded-full [&>form]:absolute [&>form]:top-0 [&>form]:left-0 [&>form]:w-full [&>form]:h-full [&>form]:rounded-full"
                >
                    <Image 
                        src={tempData.profileImg || "/user.png"} 
                        alt="Profile Picture" 
                        fill
                        className="object-cover object-center" 
                        sizes="(max-width: 768px) 100vw, 200px"
                    />
                    
                    {isEdit && (
                        <UploadButton 
                            endpoint="profileImg"
                            onUploadBegin={() => {
                                setIsUploading(true);
                            }}
                            headers={{
                                    authorization: `Bearer ${localStorage.getItem("token")}`,
                            }}
                            appearance={{
                                button: "w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 [&_input]:hidden m-0 p-0 rounded-full border-none",
                                allowedContent: "hidden",
                                container: "w-full h-full absolute inset-0 rounded-full",
                            }}
                            content={{
                            button: <Image src="/edit.png" alt="upload" width={50} height={50} className="w-12 h-12" />
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
                    )}
                </div>

                <div className="flex flex-row items-center max-md:justify-center"> 
                    {!isEdit ? (
                        <div className="inline-flex flex-row gap-3 items-center w-200 max-md:w-auto max-md:justify-center max-md:flex-wrap">
                            <p className="text-[1.6em] font-bold">
                                {tempData.firstName || "First Name"}
                            </p>
                            <p className="text-[1.6em] font-bold">
                                {tempData.lastName || "Last Name"}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-row items-start gap-6 max-md:flex-col max-md:gap-3 max-md:w-full max-md:px-2">
                            
                            <div className="flex flex-col h-28 w-72 max-md:w-full max-md:h-auto">
                                <label className={labelClass}>First Name <span className='text-red-500'>*</span></label>
                                <input
                                    className={`${inputBaseClass} ${errors.firstName ? "border-[#ef4444]! bg-[#ef4444]/10!" : ""}`}
                                    placeholder="e.g., John"
                                    value={tempData.firstName || ""}
                                    onChange={(e) => handleNameChange(e, "firstName")}
                                    onBlur={() => setErrors(prev => ({ ...prev, firstName: !tempData.firstName?.trim() }))}
                                />
                                <div className="flex justify-between items-start mt-1 px-1">
                                    <div className="w-full">
                                        {errors.firstName && <p className="text-[#ef4444] text-[12px]">Please enter your first name</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col h-28 w-72 max-md:w-full max-md:h-auto">
                                <label className={labelClass}>Last Name <span className='text-red-500'>*</span></label>
                                <input
                                    className={`${inputBaseClass} ${errors.lastName ? "border-[#ef4444]! bg-[#ef4444]/10!" : ""}`}
                                    placeholder="e.g., Doe"
                                    value={tempData.lastName || ""}
                                    onChange={(e) => handleNameChange(e, "lastName")}
                                    onBlur={() => setErrors(prev => ({ ...prev, lastName: !tempData.lastName?.trim() }))}
                                />
                                <div className="flex justify-between items-start mt-1 px-1">
                                    <div className="w-full">
                                        {errors.lastName && <p className="text-[#ef4444] text-[12px]">Please enter your last name</p>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}