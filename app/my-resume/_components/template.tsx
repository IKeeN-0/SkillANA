"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import styles from "@/app/my-resume/_components/template.module.css";

export function Template(){
    const router = useRouter();
    const templates = [
        "resumes/resume_template (3).png",
        "resumes/resume_template (1).png",
        "resumes/resume_template (2).png",
        "resumes/resume_template.png",
        "resumes/resume_template (4).png"
    ];

    const [user, setUser] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
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
            // ถ้าข้อมูลครบ 
            router.push(`/resume-export/${templateId}`);
        } else {
            // ถ้าไม่ครบ
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
        <div className={styles.container}>
            {templates.map((src: any, index) => (
                <div 
                    key={index} 
                    className={styles.itemWrapper} 
                    onClick={() => {
                        setSelectedImg(src);
                        setSelectedIdx(index);
                    }}
                >
                    <img src={src} alt="Resume Template" className={styles.item} />
                    <div className={styles.zoomButton}>
                        <img src='magnifying-glass.png' alt="Zoom in icon" className={styles.zoom} />
                    </div>
                </div>
            ))}

            {selectedImg && (
                <div 
                    className={`${styles.preview} ${isClosing ? styles.fadeOut : ""}`} 
                    onClick={handleClose}
                >
                    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.previewContent}>
                            <h2>Resume Preview</h2>
                            <button className={styles.closeBtn} onClick={handleClose}>×</button>
                        </div>
                        <img src={selectedImg} alt="Preview Template" className={styles.previewTemplate} />
                        <button className={styles.selectedBtn} onClick={handleSelectTemplate}>
                            Select this template
                        </button>
                    </div>
                </div>
            )}

            {showIncompleteModal && (
                <div className={styles.showIncomplete}onClick={() => setShowIncompleteModal(false)}>
                    <div className={styles.incompleteBox} onClick={(e) => e.stopPropagation()}>
                        <img src='info.png' alt='info logo' />
                        <h3>Incomplete Profile</h3>
                        <p>You haven't finished setting up your profile. Would you like to continue anyway?</p>
            
                        <button 
                            className={styles.goBtn} 
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