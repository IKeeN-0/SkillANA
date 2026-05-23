"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

interface InputProps {
    id: string
}

interface Badge {
    badgeId: string;
    badgeName: string;
    imgUrl: string;
    earnedAt: Date;
    _id?: string
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

    if (isLoading) {
        return (
            <>
                <section className="grow flex justify-center mt-13">
                    <div className="bg-[rgba(255,255,255,0.5)] w-[80%] h-[75%] rounded-[10px] flex justify-center items-center">
                        <div className="flex justify-center items-center w-80 h-80 min-h-50">
                            <div className="w-[50%] aspect-square max-w-75 border-15 border-solid border-[rgba(255,255,255,0.1)] border-l-white rounded-full animate-spin drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    return (
        <section className="flex justify-center mt-13 h-fit">
            <div className="bg-[rgba(255,255,255,0.5)] w-[80%] h-full p-8.5 rounded-[10px] grid grid-cols-[2fr_4.18fr]">
                
                {/* รูป */}
                <section className="flex ">
                    <div className="bg-white w-[90%] h-70 my-auto rounded-[10px] flex justify-center items-center">
                        <div className="relative w-[35%] h-[55%]">
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
                
                {/* ข้อความ */}
                <section className="flex flex-col ">

                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold">{badgeTitle}</h1>
                            {badgeCategory && (
                                <span className="mt-1 text-[0.9em] font-medium text-gray-500 bg-gray-200 px-2.5 py-1 rounded-md w-fit">
                                    {badgeCategory}
                                </span>
                            )}
                        </div>

                        {isOwn ? (
                            <div className="flex bg-[#ceefc8] rounded-[25px] items-center px-1 py-1.5 h-fit mt-1">
                                <div className="w-3 h-3 rounded-full bg-[#aee0a5] ml-1 "></div>
                                <p className="text-[small] font-semibold text-[#8cce80] px-2">Earned</p>
                            </div>
                        ) : (
                            <div className="flex bg-[#f3cece] rounded-[25px] items-center px-1 py-1.5 h-fit mt-1">
                                <div className="bg-[#eba6a6] w-3 h-3 rounded-full ml-1"></div>
                                <p className="text-[small] font-semibold text-[#ec5353] px-2 ">Not Earned</p>
                            </div>
                        )}
                    </div>

                    {/* .description */}
                    <div className="max-w-[90%] text-[1.1em] leading-9 wrap-break-word mt-3.5">
                        <p className="text-[smaller]">{badgeDescription}</p>
                    </div>

                    <section className="bg-[#ffffff96] text-[#4c1156] rounded-2xl mt-3 mb-5 p-5">
                        <p className="text-[1em] font-bold mb-1.5">To earn the badge, you must pass the test based on the following criteria :</p>

                        <div className="grid grid-cols-[160px_auto] gap-2.5 mt-2.5">
                            <p className="text-sm font-medium">Number of Questions:</p>
                            <p className="text-sm font-bold">10 <span className="font-normal">Questions</span></p>

                            <p className="text-sm font-medium">Time Limit:</p>
                            <p className="text-sm font-bold">10 <span className="font-normal">Minutes</span></p>

                            <p className="text-sm font-medium">Passing Score:</p>
                            <p className="text-sm font-bold">7 <span className="font-normal">or more correct answers</span></p>
                        </div>
                    </section>

                    <div 
                        className={isOwn 
                            ? `text-white bg-[#5e5d5d] text-[1.2em] font-semibold w-full py-3 rounded-[10px] 
                                flex justify-center items-center shadow-md cursor-not-allowed 
                                hover:bg-[#4d4d4d] hover:text-[#bdbdbd] transition-all duration-300`

                            : `text-[#5F28CD] bg-[#ffffff] text-[1.2em] font-semibold w-full py-3 rounded-[10px] flex 
                                justify-center items-center cursor-pointer shadow-md
                                hover:scale-[1.01] transition-all duration-300 hover:bg-[#5F28CD] hover:text-white`
                        } 
                        onClick={handleClick}
                    >
                        {isOwn ? "Already claimed" : "Start Assessment"}
                    </div>
                </section>

            </div>
        </section>
    )
}