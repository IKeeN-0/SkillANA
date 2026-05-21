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
            <div className={styles.text}>
                <h1>Instant resume, powered by your skills</h1>
                <div>Choose a template below to generate your professional resume.</div>
            </div>
            <div className={styles.show}>
                <div className={styles.lineWrapperBack}>
                    <div className={styles.orbitLine}></div>
                </div>

                <Image
                    className={styles.resumeImg}
                    src="/resumes/hero_show.png"
                    alt="example resume show"
                    width={280}
                    height={390}
                    priority
                />

                <div className={styles.lineWrapperFront}>
                    <div className={styles.orbitLine}></div>
                </div>

                <div className={styles.orbitContainer}>
                    {BADGES.map((src, idx) => (
                        <div 
                            key={idx} 
                            className={styles.orbitX} /*อนิเมชั่นซ้าย ขวา */
                            style={{ 
                                "--delay": `${idx * -delayStep}s`,  /* แบ่งเวลาทั้งหมดด้วยจำนวนรูป เพื่อหาว่าแต่ละรูปควรออกตัวห่างกันกี่วินาที*/
                                "--duration": `${totalCycleTime}s` /*คุมความเร็วในการหมุน*/
                            } as React.CSSProperties}
                        >
                            <div className={styles.orbitY}>        {/*อนิเมชั่นบน ล่าง */}
                                <div className={styles.badgeContent}>
                                    <Image src={src} alt="badge" width={65} height={65} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}