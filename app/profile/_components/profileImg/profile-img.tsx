import { useEditContext } from '../edit';
import { UploadButton } from "./upload";
import { useState } from 'react';
import Image from 'next/image';

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
            <div id="profile-container" className="relative w-137.5 h-50 flex items-center gap-4 max-md:w-full max-md:h-auto max-md:flex-col max-md:text-center max-md:py-4">

                <div 
                    id="profile-img-wrapper" 
                    className="group relative shrink-0 w-40 h-40 rounded-full overflow-hidden flex items-center justify-center border-2 border-solid border-[#ffffff99] [&>div]:absolute [&>div]:top-0 [&>div]:left-0 [&>div]:w-full [&>div]:h-full [&>div]:rounded-full [&>form]:absolute [&>form]:top-0 [&>form]:left-0 [&>form]:w-full [&>form]:h-full [&>form]:rounded-full"
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

                <div className="flex flex-row items-center gap-7.5 top-[50%] ml-5 max-md:ml-0 max-md:justify-center"> 
                    {!isEdit ? (
                        <>
                            <div className="inline-flex flex-row gap-3 items-center w-200 max-md:w-auto max-md:justify-center max-md:flex-wrap">
                                <p className="text-[1.6em] font-bold">
                                    {tempData.firstName || "First Name"}
                                </p>
                                <p className="text-[1.6em] font-bold ">
                                    {tempData.lastName || "Last Name"}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                           <div className="flex flex-row items-center gap-7.5 top-[50%] ml-5 max-md:ml-0 max-md:flex-col max-md:gap-3 max-md:w-full">
                                <div className="flex flex-col min-h-17.5 max-md:w-full max-md:px-2">
                                    <input
                                        className={`text-[24px] ml-10 w-100 h-10 max-md:ml-0 max-md:w-full ${errors.firstName ? "border-2! border-solid! border-[#ef4444]! outline-none" : ""}`}
                                        value={tempData.firstName || ""}
                                        onChange={(e) => handleNameChange(e, "firstName")}
                                        onBlur={() => setErrors(prev => ({ ...prev, firstName: !tempData.firstName?.trim() }))}
                                    />
                                    {errors.firstName && <p className="text-[#ef4444] text-[12px] mt-1 ml-10">Please enter your first name</p>}
                                </div>

                                <div className="flex flex-col min-h-17.5 max-md:w-full max-md:px-2">
                                    <input
                                        className={`text-[24px] ml-10 w-100 h-10 max-md:ml-0 max-md:w-full ${errors.lastName ? "border-2! border-solid! border-[#ef4444]! outline-none" : ""}`}
                                        value={tempData.lastName || ""}
                                        onChange={(e) => handleNameChange(e, "lastName")}
                                        onBlur={() => setErrors(prev => ({ ...prev, lastName: !tempData.lastName?.trim() }))}
                                    />
                                    {errors.lastName && <p className="text-[#ef4444] text-[12px] mt-1 ml-10">Please enter your last name</p>}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}