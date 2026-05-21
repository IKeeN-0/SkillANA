import styles from './home.module.css';

export function Hero_section() {
    return (
        <div className={styles.hero}>
                <h1 className={styles.mainText}>
                    Explore skills. Earn badges. Show your mastery.
                </h1>
            
            <div className={styles.subText}>
                Browse interesting skills, pass a quick test, and get a verified badge to prove your expertise.
            </div>

            <button className={styles.btn}>
                <a href=''>Start now →</a>
            </button>
        </div>
    );
};

export function ResumeSection() {
    return (
        <div className={styles.resumeSection}>
            <h2 className={styles.mainText}>
                Build your resume with ease
            </h2>

            <div className={styles.subText}>
                Select template, pick your earned badges and turn them into a professional resume in just a few clicks.
            </div>

            <div className={styles.show}>  {/*ไว้ใส่อนิเม*/}
                
            </div> 
        </div>
    );
};