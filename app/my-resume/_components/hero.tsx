import Image from "next/image";
import styles from "@/app/my-resume/_components/hero.module.css";

const BADGES = [
    "/badges/web_badge/nextjs.png", 
    "/badges/web_badge/html.png", 
    "/badges/prolang_badge/c.png", 
    "/badges/prolang_badge/python.png",
    "/badges/database_badge/mySQL.png", 
    "/badges/database_badge/mongoDB.png", 
    "/badges/datasci_badge/numPy.png", 
    "/badges/datasci_badge/pyTorch.png",
    "/badges/devops_badge/docker.png", 
    "/badges/devops_badge/yaml.png"
];

export function Hero(){
    const totalCycleTime = 40;
    const delayStep = totalCycleTime / BADGES.length;
    return(
        <div className={styles.containner}>
            {/* ปรับให้ข้อความอยู่ตรงกลางบนมือถือ และชิดซ้ายบนจอใหญ่ */}
            <div className={styles.text}>
                <h1 className="text-[1.8em] sm:text-[2.2em] md:text-[2.5em] font-bold text-center md:text-left">
                    Instant resume, powered by your skills
                </h1>
                <p className="w-full md:w-[80%] text-[1em] sm:text-[1.1em] pt-2 text-center md:text-left mx-auto md:mx-0">
                    Choose a template below to generate your professional resume.
                </p>
            </div>
            
            {/* โซนโชว์เรซูเม่: ซ่อนบนจอเล็ก (hidden) และจะแสดงตั้งแต่จอขนาดกลางขึ้นไป (md:flex) */}
            <div className={styles.show}>
                <div className={styles.lineWrapperBack}>
                    <div className={styles.orbitLine}></div>
                </div>

                <Image
                    className={styles.resumeImg}
                    src="/resumes/hero_show.png"
                    alt="example resume show"
                    width={200}
                    height={278}
                    priority
                />

                <div className={styles.lineWrapperFront}>
                    <div className={styles.orbitLine}></div>
                </div>

                <div className={styles.orbitContainer}>
                    {BADGES.map((src, idx) => (
                        <div 
                            key={idx} 
                            className={styles.orbitX}
                            style={{ 
                                "--delay": `${idx * -delayStep}s`, 
                                "--duration": `${totalCycleTime}s`
                            } as React.CSSProperties}
                        >
                            <div className={styles.orbitY}>
                                <div className={styles.badgeContent}>
                                    <Image src={src} alt="badge" width={50} height={50} className="w-[70%] h-auto" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}