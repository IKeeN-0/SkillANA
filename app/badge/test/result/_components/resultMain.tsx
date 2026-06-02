"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Spinner from "@/app/_global_components/authen_pages/spinner"

export default function ResultMain(){
    const [data, setData] = useState({
        score: 0,
        total: 0,
        timeRemain: "",
        pass: 0,
        badgeImgUrl: ""
    })

    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [showGlow, setShowGlow] = useState(false);

    const router = useRouter()

    useEffect(() => {
        setData({
            score: Number(localStorage.getItem("score")) || 0,
            total: Number(localStorage.getItem("total")) || 0,
            timeRemain: localStorage.getItem("timeRemaining") || "0:00",
            pass: Number(localStorage.getItem("pass")) || 0,
            badgeImgUrl: localStorage.getItem("imgUrl") || ""
        })

        const timer = setTimeout(() => {
            setIsLoading(false);

            setTimeout(() => {
                setShowContent(true);
            }, 50);
            
            setTimeout(() => {
                setShowGlow(true);
            }, 800);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])

    const { score, total, timeRemain, pass, badgeImgUrl } = data

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const redPart = 100 - percentage;

    const titlePass = "Congratulations!"
    const titleNotPass = "Keep it up!"
    const subTitlePass = "You have earned a badge!"
    const subTitleNotPass = "You didn't get a badge this time"
    const desPass = "Outstanding! You’ve proven your expertise through exceptional performance. This badge of achievement is now officially part of your badges page."
    const desNotPass = "So close! Although you didn't earn the badge this time, remember that every mistake is a valuable lesson. Review the materials a bit more, and we'll see you back here for your next attempt!"

    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
                <Spinner />
                <p className="mt-5 text-white/80 text-[1.2em] font-medium animate-pulse">
                    Analyzing your result...
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="w-full flex justify-center items-center py-10 2xl:pt-[2em] 2xl:py-0 2xl:my-auto min-h-[80vh] 2xl:min-h-0">
                
                {/* 🌟 1. ปรับ gap สำหรับ iPad (lg) ให้ลดลง (lg:gap-4) และบังคับ items-center เพื่อให้อยู่ตรงกลางพอดีทั้งบนและล่าง */}
                <main className="w-[90%] md:w-[85%] xl:w-[85%] 2xl:w-[70%] flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-[3.5fr_6.5fr] 2xl:grid-cols-2 gap-6 lg:gap-4 xl:gap-6 2xl:gap-0 items-center mx-auto">
                    
                    {/* 🌟 2. ลบ mt ที่เคยดันกล่องรูปภาพออก (ยกเว้น 2xl) เพื่อให้ Grid จัดวางกึ่งกลางเองอัตโนมัติ */}
                    <aside className={`flex w-full justify-center transform transition-all duration-700 ease-out ${
                        showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                    }`}>
                        <div className={`bg-white w-[60%] sm:w-[45%] lg:w-[65%] xl:w-[70%] 2xl:w-[65%] h-auto p-6 sm:p-8 lg:p-10 rounded-[10px] flex justify-center items-center relative transition-all duration-1000 ${
                            showGlow 
                                ? (pass 
                                    ? "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]" 
                                    : "drop-shadow-[0_0_20px_rgba(255,0,0,0.7)]")
                                : "drop-shadow-none"
                        }`}>
                            
                            <div className="relative w-30 h-30 sm:w-37.5 sm:h-37.5 lg:w-40 lg:h-40 xl:w-30 xl:h-30 2xl:w-42.5 2xl:h-42.5">
                                {badgeImgUrl && (
                                    <Image 
                                        src={`/${badgeImgUrl}`} 
                                        alt="Badge Image" 
                                        fill
                                        className={`object-cover rounded-full transition-all duration-1000 ${pass ? "" : "grayscale opacity-60"}`}
                                        sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 160px, (max-width: 1280px) 120px, 200px"
                                        priority
                                    />
                                )}
                            </div>

                            {pass ? (
                                <div className={`absolute -bottom-3.75 -right-3.75 sm:-bottom-5 sm:-right-5 lg:-bottom-6.25 lg:-right-6.25 w-11.25 h-11.25 sm:w-13.75 sm:h-13.75 lg:w-[65px] lg:h-[65px] 2xl:w-[80px] 2xl:h-[80px] z-10 transition-all duration-1000 ${showGlow ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                                    <div className="relative w-full h-full">
                                        <Image 
                                            src="/badgePass.png" 
                                            alt="badge pass icon" 
                                            fill 
                                            className="object-contain" 
                                        />
                                    </div>
                                </div>
                            ) : null}

                        </div>
                    </aside>
                    
                    <article className={`flex flex-col backdrop-blur bg-white/10 border-white/20 border p-5 xl:p-6 2xl:p-5 w-full 2xl:w-[75%] mx-auto rounded-[15px] shadow-2xl transform transition-all duration-700 delay-1500 ease-out ${
                        showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                    }`}>
                        <h2 className="text-2xl lg:text-[1.8em] 2xl:text-[2em] font-bold text-center">{pass ? titlePass : titleNotPass}</h2>
                        <h3 className="font-medium text-base lg:text-lg 2xl:text-[1.1em] mt-2 2xl:mt-3 text-center">{pass ? subTitlePass : subTitleNotPass}</h3>
                        
                        <div className="w-full wrap-break-word leading-relaxed 2xl:leading-7 mt-4 2xl:mt-6">
                            <p className="text-sm xl:text-base 2xl:text-[0.9em] text-white/90">{pass ? desPass : desNotPass}</p>
                        </div>

                        <div className="mt-6 px-4 py-6 xl:px-5 xl:py-7 2xl:px-6 2xl:py-8 bg-white/5 border border-white/10 backdrop-blur-md w-full h-auto rounded-[15px] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                            
                            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6 sm:gap-4 2xl:gap-0">
                                
                                <div 
                                    className="w-28 h-28 before:w-20 before:h-20 xl:w-32 xl:h-32 xl:before:w-24 xl:before:h-24 2xl:w-40 2xl:h-40 2xl:before:w-32 2xl:before:h-32 rounded-full flex justify-center items-center relative before:content-[''] before:absolute before:bg-[#20103a] before:rounded-full shadow-lg shrink-0" 
                                    style={{ background: `conic-gradient(#ff4d4f 0% ${redPart}%, #10b981 ${redPart}% 100%)` }}
                                >
                                    <span className="relative text-white text-xl xl:text-2xl 2xl:text-3xl font-bold z-10">{percentage}%</span>
                                </div>
                                
                                <div className="flex flex-col justify-center items-center sm:items-start gap-2 xl:gap-3 2xl:gap-[1.5em] w-full sm:flex-1 min-w-0 pl-0 sm:pl-4 2xl:pl-8">
                                    <p className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white wrap-break-word w-full text-center sm:text-left">Score : {score} / {total}</p>
                                    <p className="text-sm xl:text-base 2xl:text-[1.1em] font-medium text-white/60 wrap-break-word w-full text-center sm:text-left">Time Remain : {timeRemain}</p>
                                </div>
                            </div>
                        </div>

                        <div 
                            className="mt-6 2xl:mt-8 bg-[#5f28cd] text-[#ffffff] w-full text-sm xl:text-base 2xl:text-[1em] py-3 2xl:py-3.5 flex justify-center rounded-[10px] font-bold cursor-pointer transition-all duration-300 hover:bg-[#4a148c] hover:shadow-[0_0_15px_rgba(95,40,205,0.5)]" 
                            onClick={()=> router.push("/skills")}
                        >
                            Back to skills page
                        </div>
                    </article>
                </main>
            </div>
        </>
    )
}