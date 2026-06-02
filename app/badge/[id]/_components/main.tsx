"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

interface InputProps {
    id: string
}

export default function BadgePage({ id }: InputProps) {
    const router = useRouter()
    const [badgeTitle, setBadgeTitle] = useState("");
    const [badgeCategory, setBadgeCategory] = useState("");
    const [badgeDescription, setBadgeDescription] = useState("")
    const [tLimit, setTLimit] = useState("");
    const [pScore, setPScore] = useState(0);
    const [imgUrl, setImgUrl] = useState("");
    const [nQuestion, setNQuestion] = useState(0);
    const [isOwn, setIsown] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);

                const token = localStorage.getItem("token");
                if (!token) { router.push("/login"); return; }
                const decodeToken = jwtDecode(token) as any;
                const userId = decodeToken.id || decodeToken.sub || decodeToken._id;

                if (!id) { router.push("/collections"); return; }

                const [resBadge, resUser] = await Promise.all([
                    fetch(`/api/badges/${id}`),
                    fetch(`/api/users/${userId}`)
                ]);

                if (resBadge.ok) {
                    const result = await resBadge.json();
                    const data = result.badge;
                    if (data) {
                        setBadgeTitle(data.badgeName);
                        setBadgeCategory(data.category?.name || "General");
                        setBadgeDescription(data.description);
                        setImgUrl(data.imgUrl);
                        setTLimit(data.criteria.timeLimit.slice(0, 2));
                        setPScore(data.criteria.passingScore);
                        setNQuestion(data.criteria.questionNum);
                    }
                } else {
                    router.push("/collections");
                    return;
                }

                if (resUser.ok) {
                    const data = await resUser.json();
                    const userBadges = data.badges as any[];
                    const hasBadge = userBadges.find(badge => badge.badgeId === id);
                    if (hasBadge) setIsown(true);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id, router]);

    const handleClick = () => {
        if (isOwn || !id) return;
        router.push(`/badge/test/${id}`);
    }

    const searchParams = useSearchParams();
    const fromPage = searchParams.get('from');

    const backUrl = fromPage === 'collections' ? '/collections' : '/skills';

    if (isLoading) {
        return (
            <section className="grow flex justify-center py-10">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-[80%] h-[75vh] rounded-[10px] flex justify-center items-center">
                    <div className="flex justify-center items-center w-80 h-80 min-h-50">
                        <div className="w-[50%] aspect-square max-w-75 border-15 border-solid border-[rgba(255,255,255,0.1)] border-l-white rounded-full animate-spin drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="flex flex-col items-center justify-center py-10 h-fit w-full text-white">
            
            <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col items-start">
                
                <Link
                    href={backUrl}
                    className="relative inline-block text-left text-xs md:text-sm lg:text-[0.9em] mb-4 text-gray-300 hover:text-white transition-all duration-300 
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-px after:bg-white 
                                after:opacity-0 after:translate-y-0.5 hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300 cursor-pointer shrink-0"
                >
                    &lt; Back
                </Link>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full h-full p-6 lg:p-6 rounded-[10px] flex flex-col lg:grid lg:grid-cols-[2fr_4.18fr]">
                    
                    {/* รูป */}
                    <section className="flex ">
                        <div className="bg-white border border-white/10 w-full lg:w-[90%] h-64 lg:h-55 mx-auto lg:mx-0 rounded-[10px] flex justify-center items-center">
                            
                            <div className="relative h-[55%] md:h-[65%] lg:h-[60%] aspect-square">
                                {imgUrl && (
                                    <Image 
                                        src={`/${imgUrl}`} 
                                        alt={badgeTitle || "Badge"}
                                        fill
                                        className="object-cover rounded-full"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}
                            </div>

                        </div>
                    </section>
                
                    <section className="flex flex-col ">

                        <div className="flex flex-row justify-between items-start mt-5 md:mt-0 w-full gap-4">
                            
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight wrap-break-word">{badgeTitle}</h1>
                                {badgeCategory && (
                                    <span className="mt-1 text-[10px] md:text-xs lg:text-[0.9em] font-medium text-white/90 bg-white/15 border border-white/20 px-2.5 py-1 rounded-md w-fit">
                                        {badgeCategory}
                                    </span>
                                )}
                            </div>

                            {isOwn ? (
                                <div className="flex bg-[#009000] rounded-[25px] items-center px-1 py-1.5 h-fit mt-1.5 sm:mt-0.5 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ffffff] ml-1 "></div>
                                    {/* 🌟 ปรับสถานะ Earned: มือถือ text-[10px], ไอแพด text-xs, คอม text-[small] ตามเดิม */}
                                    <p className="text-[10px] md:text-xs lg:text-[small] font-semibold text-[#ffffff] px-2">Earned</p>
                                </div>
                            ) : (
                                <div className="flex bg-[#f3cece] rounded-[25px] items-center px-1 py-1.5 h-fit mt-1.5 sm:mt-0.5 shrink-0">
                                    <div className="bg-[#eba6a6] w-3 h-3 rounded-full ml-1"></div>
                                    {/* 🌟 ปรับสถานะ Not Earned: มือถือ text-[10px], ไอแพด text-xs, คอม text-[small] ตามเดิม */}
                                    <p className="text-[10px] md:text-xs lg:text-[small] font-semibold text-[#ec5353] px-2 ">Not Earned</p>
                                </div>
                            )}
                        </div>

                        {/* 🌟 ปรับคำอธิบาย Badge: มือถือ text-xs, ไอแพด text-sm, คอม text-[1.1em] ตามเดิม */}
                        <div className="max-w-full lg:max-w-[90%] text-xs md:text-sm lg:text-[1.1em] leading-relaxed wrap-break-word mt-4 lg:mt-3.5 text-white/90">
                            <p className="text-[smaller]">{badgeDescription}</p>
                        </div>

                        <section className="bg-white/5 border border-white/10 text-white rounded-2xl mt-4 mb-4 lg:mt-3 lg:mb-5 p-4 lg:p-5">
                            {/* 🌟 ปรับหัวข้อ Criteria: มือถือ text-xs, ไอแพด text-sm, คอม text-[1.1em] ตามเดิม */}
                            <p className="text-xs md:text-sm lg:text-[1.1em] font-bold mb-2 lg:mb-1.5 text-white/90">To earn the badge, you must pass the test based on the following criteria :</p>

                            <div className="grid grid-cols-[140px_auto] lg:grid-cols-[160px_auto] gap-2 lg:gap-2.5 mt-2 lg:mt-2.5">
                                {/* 🌟 ปรับรายละเอียดเกณฑ์ทั้งหมด: มือถือ text-[11px], ไอแพด text-xs, คอม text-[0.9em] ตามเดิม */}
                                <p className="text-[11px] md:text-xs lg:text-[0.9em] font-medium text-white/70">Number of Questions:</p>
                                <p className="text-[11px] md:text-xs lg:text-[0.9em] font-bold">{nQuestion} <span className="font-normal text-white/70">Questions</span></p>

                                <p className="text-[11px] md:text-xs lg:text-[0.9em] font-medium text-white/70">Time Limit:</p>
                                <p className="text-[11px] md:text-xs lg:text-[0.9em] font-bold">{tLimit} <span className="font-normal text-white/70">Minutes</span></p>

                                <p className="text-[11px] md:text-xs lg:text-[0.9em] font-medium text-white/70">Passing Score:</p>
                                <p className="text-[11px] md:text-xs lg:text-[0.9em] font-bold">{pScore} <span className="font-normal text-white/70">or more correct answers</span></p>
                            </div>
                        </section>

                        {/* 🌟 ปรับปุ่มกด: มือถือ text-sm, ไอแพด text-base, คอม text-[1.2em] ตามเดิม */}
                        <div 
                            className={isOwn 
                                ? `text-white/70 bg-white/10 border border-white/10 text-sm md:text-base lg:text-[1.2em] font-semibold w-full py-2.5 lg:py-3 rounded-[10px] 
                                    flex justify-center items-center shadow-md cursor-not-allowed transition-all duration-300 mt-auto lg:mt-0`

                                : `text-white bg-[#5F28CD] text-sm md:text-base lg:text-[1.2em] font-semibold w-full py-2.5 lg:py-3 rounded-[10px] flex 
                                    justify-center items-center cursor-pointer shadow-md
                                    hover:scale-[1.01] transition-all duration-300 hover:bg-[#4410ab] mt-auto lg:mt-0`
                            } 
                            onClick={handleClick}
                        >
                            {isOwn ? "Already claimed" : "Start Assessment"}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}