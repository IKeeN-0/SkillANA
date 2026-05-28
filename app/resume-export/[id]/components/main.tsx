"use client"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ResumeData } from "./templates/type/resume"
import Template1 from "./templates/template1"
import Template2 from "./templates/template2"
import Template3 from "./templates/template3"
import Template4 from "./templates/template4"
import Template5 from "./templates/template5"

export interface IUserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImg: string;
    contact: {
        phoneNumber: string;
        address: string;
    };
    education: {
        level: string;
        major: string;
        university: string;
        // ====== 1. เพิ่ม startDate และ endDate ตรงนี้ ======
        startDate?: string;
        endDate?: string;
    };
    experience: {
        _id: string;
        title: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
    badges: {
        badgeId: string;
        badgeName: string;
        imgUrl: string;
        earnedAt: string;
        _id: string;
    }[];
    aboutMe: string;
}

interface ICategory {
    categoryId: string;
    name: string;
}

interface ICriteria {
    questionNum: number;
    timeLimit: string;
    passingScore: number;
}

interface IQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
}

interface ITest {
    questions: IQuestion[];
}

interface IBadgeDetail {
    _id: string;
    badgeName: string;
    category: ICategory;
    imgUrl: string;
    description: string;
    criteria: ICriteria;
    test: ITest;
}

interface IBadgeWithCat {
    _id: string;
    badgeName: string;
    category: string;
    imgUrl: string;
}

export default function ResumeExport({id} : {id : number}) {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [badgeInfo, setBadgeInfo] = useState<IBadgeDetail[] | null>(null);
    const [currCat, setCurrCat] = useState("All Badge");
    const [badgeWithCat, setBadgeWithCat] = useState<IBadgeWithCat[]>([]);
    const [numSelectedBadge, setNumSelectedBadge] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean[]>([]); 
    const [mounted, setMounted] = useState(false); // แก้ Hydration
    const [myResumeData , setMyResumeData] = useState<ResumeData | null>(null)
    const router = useRouter();

    const iconClass = "w-[1.2em] h-[1.2em] shrink-0";

    const categories = [
        { 
            name: "All Badge", 
            icon: (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V16zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V16z" />
                </svg>
            ) 
        },
        { 
            name: "Website Development", 
            icon: (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ) 
        },
        { 
            name: "Programming Language", 
            icon: (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ) 
        },
        { 
            name: "Data Science", 
            icon: (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            ) 
        },
        { 
            name: "Database", 
            icon: (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ) 
        },
        { 
            name: "Cloud & DevOps", 
            icon: (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            ) 
        }
    ];

    useEffect(() => {
        setMounted(true); 
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) { router.push("/login"); return; }
                const decodeToken = jwtDecode(token) as any;
                const userId = decodeToken.id || decodeToken.sub || decodeToken._id;

                const [userRes, badgesRes] = await Promise.all([
                    fetch(`/api/users/${userId}`),
                    fetch(`/api/badges`)
                ]);

                if (!userRes.ok || !badgesRes.ok) throw new Error("Failed to fetch data");
                const userData = await userRes.json();
                const allBadgesData = await badgesRes.json();

                setUser(userData);
                setBadgeInfo(allBadgesData);

                const tmpUser : IUserProfile = userData

                const toResume :ResumeData = {
                    firstName : tmpUser.firstName,
                    lastName : tmpUser.lastName,
                    email : tmpUser.email,
                    aboutMe : tmpUser.aboutMe,
                    contact : {
                        phoneNumber : tmpUser.contact.phoneNumber,
                        address : tmpUser.contact.address,
                    },
                    education :{
                        level : tmpUser.education.level,
                        major :tmpUser.education.major,
                        university : tmpUser.education.university,
                        startDate: tmpUser.education.startDate || "",
                        endDate: tmpUser.education.endDate || ""
                    },
                    profileImg : tmpUser.profileImg
                    ,
                    experience : tmpUser.experience,
                    badges : []
                }
                setMyResumeData(toResume)
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [router]);

    useEffect(() => {
        if (user && badgeInfo) {
            const merged = user.badges.map((userBadge) => {
                const masterDetail = badgeInfo.find(b => b.badgeName === userBadge.badgeName);
                return {
                    _id: userBadge._id,
                    badgeName: userBadge.badgeName,
                    category: masterDetail?.category.name || "Other",
                    imgUrl: userBadge.imgUrl
                };
            });
            setBadgeWithCat(merged);
            setIsSelected(new Array(merged.length).fill(false));
        }
    }, [user, badgeInfo]);


    useEffect(() => {
        if (myResumeData && badgeWithCat.length > 0) {
 
            const selectedBadges = badgeWithCat
                .filter((_, idx) => isSelected[idx])
                .map(badge => ({
                    badgeName: badge.badgeName,
                    imgUrl: badge.imgUrl
                }));

            setMyResumeData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    badges: selectedBadges
                };
            });
        }
    }, [isSelected, badgeWithCat]);

    const handleClickBadge = (idx: number) => {
        const currentlySelected = isSelected[idx];
        if (!currentlySelected && numSelectedBadge >= 6) return;

        const nextSelected = [...isSelected];
        nextSelected[idx] = !currentlySelected;
        
        setIsSelected(nextSelected);
        setNumSelectedBadge(prev => currentlySelected ? prev - 1 : prev + 1);
    };

    const handleDownloadClick = async () => {
        if (!myResumeData) return alert("Data not ready");

        try {
            const response = await fetch('/api/print', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            // ส่ง selectedTemplate จาก state ไปให้ API
                body: JSON.stringify({ data: myResumeData, templateId: id }),
            });

            if (!response.ok) throw new Error("Download failed");

            // สร้าง Blob เพื่อสั่ง Download ไฟล์ใน Browser
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "my_resume.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error(err);
            alert("Error downloading PDF");
        }
    };
    if (!mounted) return null;
    return (
        <>
            <section className="flex flex-col p-8 py-10 shrink-0 w-[30%] min-w-87.5 max-w-112.5 h-full max-h-screen overflow-y-auto bg-[#23103d] border-r border-[#ffffff1a] 
                [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
                
                    <Link 
                        href='/my-resume' 
                        className="relative inline-block self-start text-[1.1em] mb-4 text-gray-300 hover:text-white transition-all duration-300 
                                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-px after:bg-white 
                                    after:opacity-0 after:translate-y-0.5 hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                    >
                        &lt; Go Back
                    </Link>

                <div className="flex flex-col gap-[0.5em]">
                    <h3 className="text-[1.5em] font-bold">Add your skills</h3>
                    <p className="text-[1.1em]">Select badges to display in resume {`(${numSelectedBadge}/6)`}</p>
                </div>

                <div className="w-full mt-[2em]">
                    <ul className="flex gap-5 w-full overflow-x-auto pb-3 touch-pan-x
                        [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:block [&::-webkit-scrollbar-track]:bg-[#e0e0e0] 
                        [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[#7050B3] 
                        [&::-webkit-scrollbar-thumb]:rounded-[10px]"
                    >
                        {categories.map((cat) => (
                            <li
                                key={cat.name}
                                onClick={() => setCurrCat(cat.name)}
                                className={`shrink-0 flex items-center gap-[.5em] py-[.5em] px-[1em] text-[1.3em] rounded-[50px] cursor-pointer 
                                    transition-all duration-500 ease-in-out 
                                    ${currCat === cat.name ? "bg-[#300783] text-[#efe0ff]"
                                    : "bg-[#efe0ff] text-[#300783] hover:bg-[#5F28CD] hover:text-white"}`}
                            >
                                {cat.icon}
                                <h5 className="text-[smaller] font-semibold">{cat.name}</h5>
                            </li>
                        ))}
                    </ul>
                </div>

                <h3 className="text-[1.5em] font-semibold mt-10">{currCat}</h3>

                <div className="w-full flex-1 min-h-75 p-5 mt-[1em] mb-[2.2em] rounded-[15px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)] flex flex-col">
                    
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(6em,1fr))] auto-rows-min gap-4 w-full h-full overflow-y-auto p-2 pr-3
                        [&::-webkit-scrollbar]:w-1.5 
                        [&::-webkit-scrollbar-track]:bg-transparent 
                        [&::-webkit-scrollbar-thumb]:bg-white/20 
                        [&::-webkit-scrollbar-thumb]:rounded-full 
                        hover:[&::-webkit-scrollbar-thumb]:bg-white/40"
                    >
                        {badgeWithCat.map((badge, idx) => {
                            if (currCat !== "All Badge" && badge.category !== currCat) return null;

                            const selected = isSelected[idx];

                            return (
                                <div
                                    key={badge._id}
                                    className={`relative p-2 text-[0.8em] font-semibold flex flex-col items-center justify-between cursor-pointer rounded-xl transition-all duration-300 ease-in-out ${
                                        selected 
                                        ? "bg-[#5F28CD]/40 border border-[#dfa8ff]/60 shadow-[0_0_15px_rgba(155,81,224,0.5)] scale-105 z-10" 
                                        : "border border-transparent hover:bg-white/5 hover:scale-105 z-0"
                                    }`}
                                    onClick={() => handleClickBadge(idx)}
                                >
                                    {selected && (
                                        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#10b981] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.8)] z-10">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    
                                    <div className="w-full flex justify-center items-center aspect-square">
                                        <Image 
                                            src={`/${badge.imgUrl}`} 
                                            alt={badge.badgeName} 
                                            width={100} 
                                            height={100} 
                                            className={`w-[70%] h-[70%] object-contain transition-all duration-300 ${selected ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""}`} 
                                        />
                                    </div>
                                    
                                    <p className={`text-[1.1em] text-center w-full transition-colors duration-300 leading-tight ${selected ? "text-[#dfa8ff]" : "text-white"}`}>
                                        {badge.badgeName}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center w-full h-full py-5 overflow-hidden">
                {myResumeData ? (
                    <div className="w-[147mm] h-[207.9mm] relative shrink-0 flex overflow-hidden bg-white shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                        {
                            id === 1 ? <Template1 data={myResumeData} size="small" /> :
                            id === 2 ? <Template2 data={myResumeData} size="small" /> :
                            id === 3 ? <Template3 data={myResumeData} size="small" /> :
                            id === 5 ? <Template5 data={myResumeData} size="small" /> :
                            <Template4 data={myResumeData} size="small" /> 
                        }
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </section>

            <section className="pt-12 h-27 w-110 flex">
                <div 
                    className="flex text-[1em] font-semibold items-center justify-center gap-[.5em] w-[80%] p-[3%] bg-[#5F28CD] rounded-[40px] cursor-pointer transition-all duration-200 ease-in hover:bg-[#533d8b]" 
                    onClick={handleDownloadClick}
                >
                        <Image src="/icon/pdf-file.png" alt="pdf-icon" width={40} height={40} className="w-[1.8em] h-[1.8em] invert" />
                        Download PDF
                </div>
            </section>
        </>
    );
}