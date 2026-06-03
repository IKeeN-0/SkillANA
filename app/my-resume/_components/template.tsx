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
                             userData.education.major?.trim() !== "" &&
                             userData.education.startDate && 
                             userData.education.endDate;
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
                    className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.652)] flex justify-center items-center z-1000 p-4 ${isClosing ? styles.fadeOut : ""}`} 
                    onClick={handleClose}
                >
                    {/* ─── 📦 จุดที่แก้ไขหลัก: ปรับความกว้างกล่องให้ยืดหยุ่น (w-[92%] บนมือถือ -> md:w-[45%] บนจอคอม) ─── */}
                    <div 
                        className={`bg-[#1b0d30] rounded-[15px] w-[92%] sm:w-[70%] md:w-[45%] lg:w-[35%] h-auto max-h-[95vh] my-auto mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 overflow-y-auto p-4 ${styles.popupAni}`} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        
                        {/* ─── ✏️ ส่วนหัว: ปรับปุ่มปิดไม่ให้เบียดตัวหนังสือ ─── */}
                        <div className="relative w-full flex items-center justify-between px-2 mt-2">
                            <h2 className="text-[1.2em] sm:text-[1.3em] font-semibold">Resume Preview</h2>
                            <button 
                                className="bg-transparent border-none text-white text-[2rem] leading-none cursor-pointer transition-transform duration-200 hover:scale-125" 
                                onClick={handleClose}
                            >
                                &times;
                            </button>
                        </div>

                        {/* ─── 🖼️ ส่วนรูปภาพ: ปรับให้กว้างพอดีกับกล่องเสมอ ─── */}
                        <div className="w-full flex justify-center items-center my-2">
                            <Image 
                                src={`/${selectedImg}`} 
                                alt="Preview Template" 
                                width={800} 
                                height={1130} 
                                className="w-auto h-auto max-w-[90%] max-h-[55vh] sm:max-h-[60vh] shadow-[0_0_20px_rgba(0,0,0,0.3)] object-contain rounded" 
                            />
                        </div>
                        
                        {/* ─── 🔘 ส่วนปุ่ม: ปรับความกว้างปุ่มให้แปรผันตามกล่อง (w-[85%]) ไม่ใช้ Padding แนวนอนตายตัวเพื่อป้องกันปุ่มล้น ─── */}
                        <button 
                            className="w-[85%] bg-[#5F28CD] border-none text-white py-3 sm:py-4 font-inherit text-[1rem] sm:text-[1.125rem] font-semibold rounded-[40px] transition-all duration-150 ease-in mb-4 cursor-pointer hover:bg-[#4716a9] text-center" 
                            onClick={handleSelectTemplate}
                        >
                            Select this template
                        </button>
                    </div>
                </div>
            )}

            {showIncompleteModal && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-10000" onClick={() => setShowIncompleteModal(false)}>
                    
                    <div className={`bg-[#3A1C63] p-9 rounded-[15px] text-center w-md h-auto shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${styles.incompleteBoxAni}`} onClick={(e) => e.stopPropagation()}>
                        
                        <Image src="/info.png" alt="info logo" width={100} height={100} className="w-[22%] mb-4 inline-block" />
                        <h3 className="mb-3 text-[1.5em] font-bold">Incomplete Profile</h3>
                        <p className="mb-4">You haven't finished setting up your profile. Would you like to continue anyway?</p>
            
                        <button 
                            className="border-none text-white font-inherit bg-[#5F28CD] py-4 px-13 rounded-[50px] text-[1rem] font-semibold transition-all duration-150 ease-in cursor-pointer hover:bg-[#4716a9]" 
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