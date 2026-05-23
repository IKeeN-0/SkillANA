"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"

export default function ResultMain(){
    const [data, setData] = useState({
        score: 0,
        total: 0,
        timeRemain: "",
        pass: 0,
        badgeImgUrl: ""
    })

    const router = useRouter()

    useEffect(() => {
        setData({
            score: Number(localStorage.getItem("score")) || 0,
            total: Number(localStorage.getItem("total")) || 0,
            timeRemain: localStorage.getItem("timeRemaining") || "0:00",
            pass: Number(localStorage.getItem("pass")) || 0,
            badgeImgUrl: localStorage.getItem("imgUrl") || ""
        })
    }, [])

    const { score, total, timeRemain, pass, badgeImgUrl } = data

    // เปอร์เซ็นต์วงกลม
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const redPart = 100 - percentage;

    const titlePass = "Congratulations!"
    const titleNotPass = "Keep it up!"
    const subTitlePass = "You have earned a badge!"
    const subTitleNotPass = "You didn't get a badge this time"
    const desPass = "Outstanding! You’ve proven your expertise through exceptional performance. This badge of achievement is now officially part of your badges page."
    const desNotPass = "So close! Although you didn't earn the badge this time, remember that every mistake is a valuable lesson. Review the materials a bit more, and we'll see you back here for your next attempt!"

    return (
        <>
            <div className="w-full flex justify-center items-center pt-[2em]">
                <main className="w-[70%] h-[80%] grid grid-cols-2">
                    
                    <aside className="flex justify-center items-center">
                        <div className={`bg-white w-[65%] h-[38%] rounded-[10px] flex justify-center items-center relative transition-all duration-1000 ${
                            pass 
                                    ? "drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]" // ผ่าน: แสงเรืองสีทอง (Gold)
                                    : "drop-shadow-[0_0_20px_rgba(255,0,0,0.7)]"     // ไม่ผ่าน: แสงเรืองสีแดง
                        }`}>
                            
                            {/* .imgFrame / .imgNotPass 
                                เนื่องจากใช้หน่วยเป็น % การใช้ next/image (fill) จึงต้องสร้าง div มาครอบไว้ 
                            */}
                            <div className="relative w-[45%] h-[70%]">
                                {badgeImgUrl && (
                                    <Image 
                                        src={`/${badgeImgUrl}`} 
                                        alt="Badge Image" 
                                        fill
                                        className={`object-cover rounded-full ${pass ? "" : "grayscale opacity-60"}`}
                                    />
                                )}
                            </div>

                            {pass ? (
                                <div className="absolute top-[70%] left-[65%] w-[50%] h-[70%] z-10">
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
                    
                    <article className="flex flex-col mt-10 backdrop-blur bg-white/10 border-white/20 border p-5 w-[75%] rounded-[15px] shadow-2xl">
                        <h2 className="text-[2em] font-bold text-center mt-4">{pass ? titlePass : titleNotPass}</h2>
                        <h3 className="font-medium text-[1.1em] mt-3 text-center">{pass ? subTitlePass : subTitleNotPass}</h3>
                        
                        <div className="w-full wrap-break-word leading-loose mt-6">
                            <p className="text-[1em]">{pass ? desPass : desNotPass}</p>
                        </div>

                        <div className="mt-6 px-6 py-9 bg-[#5f28cd] w-full h-auto rounded-[10px] ">
                            
                            <div className="flex justify-between">
                                <div 
                                    // จัดการ::before ผ่านคลาส before: ของ Tailwind ได้เลย ไม่ต้องเขียน CSS แยก
                                    className="w-43 h-43 rounded-full flex justify-center items-center relative before:content-[''] before:absolute before:w-35 before:h-35 before:bg-[#4A148C] before:rounded-full" 
                                    style={{ background: `conic-gradient(#ff0000 0% ${redPart}%, #66d855 ${redPart}% 100%)` }}
                                >
                                    <span className="relative text-white text-2xl font-bold z-10">{percentage}%</span>
                                </div>
                                
                                <div className="flex flex-col items-center justify-center gap-[2em] w-[50%]">
                                    <p className="text-3xl font-semibold">Score : {score} / {total}</p>
                                    <p className="text-[large] font-medium text-white/80">Time Remain : {timeRemain}</p>
                                </div>
                            </div>
                        </div>

                        <div 
                            className="mt-6 bg-[#ffffff] text-[#5f28cd] w-full text-[1em] py-3 flex justify-center rounded-[10px] font-semibold cursor-pointer transition-all duration-200 hover:bg-[#4a148c] hover:text-white" 
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