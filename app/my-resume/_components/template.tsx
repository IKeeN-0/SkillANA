"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import styles from "@/app/my-resume/_components/template.module.css";

export function Template(){
    const router = useRouter();
    const templates = [
        "resumes/resume_template1.png",
        "resumes/resume_template2.png",
        "resumes/resume_template3.png",
        "resumes/resume_template4.png",
        "resumes/resume_template5.png"
    ];

    const [user, setUser] = useState(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [showIncompleteModal, setShowIncompleteModal] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const decoded = jwtDecode(token) as { id: string };
                const userId = decoded.id;
                const res = await fetch(`/api/users/${userId}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const profileData = await res.json();
                    setUser(profileData);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);

    const checkDataComplete = (userData: any) => {
        if (!userData) return false;
        const hasNames = userData.firstName?.trim() && userData.lastName?.trim();
        const hasAboutMe = userData.aboutMe?.trim() !== "" && userData.aboutMe !== undefined;
        const hasContact = userData.contact && 
                           userData.contact.phoneNumber?.trim()!== "" &&
                           userData.contact.address?.trim()!== "";
        const hasEducation = userData.education && 
                             userData.education.level?.trim() !== "" &&
                             userData.education.university?.trim() !== "" &&
                             userData.education.major?.trim() !== "";
        const hasExperience = Array.isArray(userData.experience) && userData.experience.length > 0;
        return hasNames && hasAboutMe && hasContact && hasEducation && hasExperience;
    };

    const handleSelectTemplate = () => {
        if (selectedIdx === null) return;
        const templateId = selectedIdx + 1;
        if (checkDataComplete(user)) {
            router.push(`/resume-export/${templateId}`);
        } else {
            setSelectedImg(null);
            setShowIncompleteModal(true);
        }
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImg(null);
            setIsClosing(false);
        }, 300);
    };

    return(
        <div className="w-[90%] bg-[rgba(255,255,255,0.2)] min-h-80 mx-auto mb-40 rounded-[15px] border border-solid border-white grid grid-cols-4 p-[3%] gap-x-12 gap-y-10">
            {templates.map((src: string, index) => (
                <div 
                    key={index} 
                    className="group relative w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in-out border-[1.5px] border-transparent hover:border-[rgba(255,255,255,0.8)] hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.4),0_0_5px_2px_rgba(255,255,255,0.2)] hover:-translate-y-1.25" 
                    onClick={() => {
                        setSelectedImg(src);
                        setSelectedIdx(index);
                    }}
                >
                    <Image src={`/${src}`} alt="Resume Template" width={400} height={565} className="w-full h-auto block" />
                    
                    <div className="absolute bottom-4 right-[1.06rem] w-10 h-10 bg-[#5F28CD] rounded-full flex items-center justify-center opacity-0 translate-y-1.25 transition-all duration-300 z-10 group-hover:opacity-100 group-hover:translate-y-0">
                        <Image src="/magnifying-glass.png" alt="Zoom in icon" width={20} height={20} className="w-[47%]" />
                    </div>
                </div>
            ))}

            {selectedImg && (
                <div 
                    className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.652)] flex justify-center items-center z-1000 ${isClosing ? styles.fadeOut : ""}`} 
                    onClick={handleClose}
                >
                    <div className={`bg-[#1b0d30] rounded-[10px] w-[40%] h-auto my-[1.8%] mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 ${styles.popupAni}`} onClick={(e) => e.stopPropagation()}>
                        
                        <div className="relative w-[95%] max-h-[90vh] flex items-center justify-between mt-4">
                            <h2 className="ml-6 text-[1.3em] font-semibold">Resume Preview</h2>
                            <button className="w-[5%] bg-transparent border-none text-white text-[2.5rem] cursor-pointer transition-transform duration-200 hover:scale-125" onClick={handleClose}>×</button>
                        </div>

                        <Image src={`/${selectedImg}`} alt="Preview Template" width={800} height={1130} className="w-auto h-auto max-h-[75vh] shadow-[0_0_30px_rgba(0,0,0,0.5)] object-contain mb-2" />
                        
                        <button className="bg-[#5F28CD] border-none text-white py-4 px-40 font-inherit text-[1.125rem] font-semibold rounded-[40px] transition-all duration-150 ease-in mb-6 cursor-pointer hover:bg-[#4716a9]" onClick={handleSelectTemplate}>
                            Select this template
                        </button>
                    </div>
                </div>
            )}

            {showIncompleteModal && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-10000" onClick={() => setShowIncompleteModal(false)}>
                    
                    <div className={`bg-[#3A1C63] p-9 rounded-[15px] text-center w-md h-auto shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${styles.incompleteBoxAni}`} onClick={(e) => e.stopPropagation()}>
                        
                        <Image src="/info.png" alt="info logo" width={100} height={100} className="w-[22%] mb-4 inline-block" />
                        <h3 className="mb-3">Incomplete Profile</h3>
                        <p className="mb-[0.7rem]">You haven't finished setting up your profile. Would you like to continue anyway?</p>
            
                        <button 
                            className="border-none text-white font-inherit bg-[#5F28CD] py-4 px-13 rounded-[50px] text-[1rem] transition-all duration-150 ease-in cursor-pointer hover:bg-[#4716a9]" 
                            onClick={() => router.push('/profile')}
                        >
                            Go to Profile
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}