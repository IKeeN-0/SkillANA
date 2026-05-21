"use client"

import { useEffect, useState } from "react"
import styles from "./resultMain.module.css"
import { useRouter } from 'next/navigation'
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

    // Logic คำนวณเปอร์เซ็นต์สำหรับวงกลม
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const redPart = 100 - percentage;

    const titlePass = "Congratulations!"
    const titleNotPass = "Keep it up!"
    const subTitlePass = "You have earned a badge!"
    const subTitleNotPass = "You didn't get a badge this time"
    const desPass = "Outstanding! You’ve proven your expertise through exceptional performance. This badge of achievement is now officially part of your badges page."
    const desNotPass = "So close! Although you didn't earn the badge this time, remember that every mistake is a valuable lesson. Review the materials a bit more, and we'll see you back here for your next attempt!"

    return (<>
        <div className={styles.mainBg}>
            <main className={styles.mainBox}>
                <aside className={styles.imgBox}>
                    <div className={styles.imgContainer}>
                        <img className={pass ? styles.imgFrame : styles.imgNotPass} src={`/${badgeImgUrl}`} alt="" />
                        {pass ? <img className={styles.badgePass} src="/badgePass.png" alt="badge" /> : ""}
                    </div>
                </aside>
                
                <article className={styles.contentBox}>
                    <h2 style={{fontSize : "xx-large"}}>{pass ? titlePass : titleNotPass}</h2>
                    <h3 style={{fontWeight : "500", fontSize: "x-large"}}>{pass ? subTitlePass : subTitleNotPass}</h3>
                    <div className={styles.descriptionSection}>
                        <p style={{fontSize : "medium"}}>{pass ? desPass : desNotPass}</p>
                    </div>

                    <div className={styles.resultBox}>
                        <div style={{display : "flex", alignItems : "center", paddingLeft : "1em"}}>
                            <p style={{fontSize : "large" , fontWeight: "500"}}>Result :</p>
                        </div>
                        <div className={styles.resultInfoContainer}>
                            {/* แก้ไข Syntax ตรง diagram ให้ใส่ style ได้ถูกต้อง */}
                            <div 
                                className={styles.diagram} 
                                style={{ background: `conic-gradient(#FF0000 0% ${redPart}%, #00D100 ${redPart}% 100%)` }}
                            >
                                <span className={styles.percentageText}>{percentage}%</span>
                            </div>
                            
                            <div className={styles.info}>
                                <p style={{fontSize : "large" , fontWeight: "500"}}>Score : {score} / {total}</p>
                                <p style={{fontSize : "large" , fontWeight: "500"}}>Time Remain : {timeRemain}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.btn} onClick={()=> router.push("/home")}>Go to home page</div>
                </article>
            </main>
        </div>
    </>)
}