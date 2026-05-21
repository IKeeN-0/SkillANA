"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import Image from "next/image"; // นำเข้า next/image

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
                {/* .frame */}
                <section className="grow flex justify-center pt-[4em]">
                    {/* .mainBoxLoad */}
                    <div className="bg-[rgba(255,255,255,0.5)] w-[85%] h-[80%] rounded-[10px] flex justify-center items-center">
                        {/* .loadingWrapper */}
                        <div className="flex justify-center items-center w-full h-full min-h-[200px]">
                            {/* .spinner */}
                            <div className="w-[80%] aspect-square max-w-[300px] border-[15px] border-solid border-[rgba(255,255,255,0.1)] border-l-white rounded-full animate-spin drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    return (
        <section className="grow flex justify-center pt-[4em]">
            {/* .mainBox */}
            <div className="bg-[rgba(255,255,255,0.5)] w-[85%] h-[80%] rounded-[10px] grid grid-cols-[1.25fr_2fr]">

                {/* .boxLeft */}
                <section className="flex justify-center pt-[2.5em]">
                    {/* .imgContainer */}
                    <div className="bg-white w-[80%] h-[50%] rounded-[10px] flex justify-center items-center">
                        {/* การใช้ next/image (fill) เราจำเป็นต้องสร้าง div ครอบที่มีขนาดเท่ากับขนาดรูปที่เราต้องการ 
                          ซึ่งในที่นี้คือ .imgFrame (w: 45%, h: 70%) 
                        */}
                        <div className="relative w-[45%] h-[70%]">
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

                {/* .boxRight */}
                <section className="flex flex-col justify-evenly">

                    {/* .titleSection */}
                    <div className="flex w-[95%] justify-between">
                        <h1 className="text-[x-large]">{badgeTitle}</h1>
                        
                        {/* .ownBar vs .notOwnBar */}
                        <div className={isOwn 
                            ? "bg-[rgb(0,255,110)] w-[10%] h-[70%] rounded-[25px] flex justify-center items-center gap-[.5em]" 
                            : "bg-[#CD5F61] w-[13%] h-[70%] rounded-[25px] flex justify-center items-center gap-[.5em]"
                        }>
                            {/* .circleOwn vs .circleNotOwn */}
                            <div className={isOwn 
                                ? "w-[15%] h-[45%] rounded-full bg-white" 
                                : "bg-[#FFBEBF] w-[13%] h-[45%] rounded-full"
                            }></div>
                            <p className={isOwn ? "text-[smaller] font-bold" : "text-[smaller] font-bold text-[#840C0E]"}>
                                {isOwn ? "Own" : "Not own"}
                            </p>
                        </div>
                    </div>

                    {/* .descriptionSection */}
                    <div className="w-[40em] break-words">
                        <p className="text-[smaller]">{badgeDescription}</p>
                    </div>

                    <hr className="text-white w-[85%] border-t-[1px] border-solid" />

                    <p className="text-[smaller] font-bold">To earn the badge, you must pass the test based on the following criteria :</p>

                    <div>
                        <p className="text-[smaller]">Number of Questions: {nQuestion} Questions</p>
                        <p className="text-[smaller]">Time Limit: {tLimit} Minutes</p>
                        <p className="text-[smaller]">Passing Score: {pScore} or more correct answers to earn the badge</p>
                    </div>

                    {/* .btnAlready vs .btnClaim */}
                    <div 
                        className={isOwn 
                            ? "text-white bg-[rgb(91,90,90)] w-[30%] h-[7%] rounded-[10px] flex justify-center items-center" 
                            : "text-white bg-[#5F28CD] font-[600] w-[30%] h-[7%] rounded-[10px] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#441f8d]"
                        } 
                        onClick={handleClick}
                    >
                        {isOwn ? "Already claimed" : "Claim"}
                    </div>
                </section>

            </div>
        </section>
    )
}