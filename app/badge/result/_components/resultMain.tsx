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
            <div className="w-full flex justify-center items-center pt-[2em] my-auto">
                <main className="w-[70%] grid grid-cols-2">
                    
                    <aside className={`flex justify-center mt-20 transform transition-all duration-700 ease-out ${
                        showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                    }`}>
                        <div className={`bg-white w-[65%] h-[45%] rounded-[10px] flex justify-center items-center relative transition-all duration-1000 ${
                            showGlow 
                                ? (pass 
                                    ? "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]" 
                                    : "drop-shadow-[0_0_20px_rgba(255,0,0,0.7)]")
                                : "drop-shadow-none"
                        }`}>
                            
                            <div className="relative w-[45%] h-[70%]">
                                {badgeImgUrl && (
                                    <Image 
                                        src={`/${badgeImgUrl}`} 
                                        alt="Badge Image" 
                                        fill
                                        className={`object-cover rounded-full transition-all duration-1000 ${pass ? "" : "grayscale opacity-60"}`}
                                    />
                                )}
                            </div>

                            {pass ? (
                                <div className={`absolute top-[70%] left-[65%] w-[50%] h-[70%] z-10 transition-all duration-1000 ${showGlow ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                                    <Image 
                                        src="/badgePass.png" 
                                        alt="badge pass icon" 
                                        fill 
                                        className="object-contain" 
                                    />
                                </div>
                            ) : ""}

                        </div>
                    </aside>
                    
                    <article className={`flex flex-col mt-8 backdrop-blur bg-white/10 border-white/20 border p-5 w-[75%] rounded-[15px] shadow-2xl transform transition-all duration-700 delay-1500 ease-out ${
                        showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                    }`}>
                        <h2 className="text-[2em] font-bold text-center">{pass ? titlePass : titleNotPass}</h2>
                        <h3 className="font-medium text-[1.1em] mt-3 text-center">{pass ? subTitlePass : subTitleNotPass}</h3>
                        
                        <div className="w-full wrap-break-word leading-7 mt-6">
                            <p className="text-[0.9em] text-white/90">{pass ? desPass : desNotPass}</p>
                        </div>

                        <div className="mt-6 px-6 py-8 bg-white/5 border border-white/10 backdrop-blur-md w-full h-auto rounded-[15px] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                            
                            <div className="flex justify-between items-center">
                                <div 
                                    className="w-40 h-40 rounded-full flex justify-center items-center relative before:content-[''] before:absolute before:w-32 before:h-32 before:bg-[#20103a] before:rounded-full shadow-lg" 
                                    style={{ background: `conic-gradient(#ff4d4f 0% ${redPart}%, #10b981 ${redPart}% 100%)` }}
                                >
                                    <span className="relative text-white text-3xl font-bold z-10">{percentage}%</span>
                                </div>
                                
                                <div className="flex flex-col justify-center gap-[1.5em] w-[50%]">
                                    <p className="text-3xl font-bold text-white">Score : {score} / {total}</p>
                                    <p className="text-[1.1em] font-medium text-white/60">Time Remain : {timeRemain}</p>
                                </div>
                            </div>
                        </div>

                        <div 
                            className="mt-8 bg-[#5f28cd] text-[#ffffff] w-full text-[1em] py-3.5 flex justify-center rounded-[10px] font-bold cursor-pointer transition-all duration-300 hover:bg-[#4a148c] hover:shadow-[0_0_15px_rgba(95,40,205,0.5)]" 
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