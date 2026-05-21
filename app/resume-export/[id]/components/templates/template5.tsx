"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template5.module.css"
import { useEffect, useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template4({ data, size }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !data) {
    return <div>Loading...</div>;
  }

  // แยกก้อนเนื้อหาออกมา จะได้ไม่ต้องเขียนซ้ำ
  const ResumeContent = (
    <div className={styles.container}>
      <section className={styles.name}>
        <h2>{data.firstName} {data.lastName}</h2>
      </section>
      
      <div className={styles.horizonLine}></div>

      <section className={styles.contact}>
        {data.contact.address.length > 40 ? (
          <>
            <p>{data.contact.phoneNumber} | {data.email}</p>
            <p>{data.contact.address}</p>
          </>
        ) : (
          <p>{data.contact.phoneNumber} | {data.email} | {data.contact.address}</p>
        )}
      </section>
      
      <div className={styles.horizonLine}></div>

      <section className={styles.aboutme}>
        <p>{data.aboutMe}</p>
      </section>

      <section className={styles.education}>
        <h2>EDUCATION</h2>
        <div className={styles.horizonLine}></div>
        <h5 className={styles.university}>{data.education.university}</h5>
        <h6 className={styles.major}>{data.education.major}</h6>
        <p className={styles.level}>{data.education.level}</p>
      </section>

      <section className={styles.exp}>
        <h2>EXPERIENCE</h2>
        <div className={styles.horizonLine}></div>
        {data.experience?.map((experience, idx) => (
          <div key={idx} className={styles.expBox}>
            <section className={styles.expContent}>
              <div className={styles.titleDate}>
                <h6 className={styles.title}>{experience.title}</h6>
                <h6 className={styles.date}>{`${experience.startDate.slice(0, 4)} - ${experience.endDate.slice(0, 4)}`}</h6>  
              </div>
              <ul>
                <li className={styles.description}>{experience.description}</li>
              </ul>
              
            </section>
          </div>
        ))}
      </section>

      <section className={styles.skill}>
        <h2>SKILLS</h2>
        <div className={styles.horizonLine}></div>
        <ul className={styles.skillList}>
          {data.badges?.map((badge, idx) => (<li key={idx}>{badge.badgeName}</li>))}
        </ul>
      </section>

        
    </div>
  );

  // เลือกว่าจะเรนเดอร์ขนาดเล็ก (มีกล่องครอบ) หรือขนาดเต็ม
  return size === "full" ? (
    <div className={mainstyles.ResumeFull}>
      {ResumeContent}
    </div>
  ) : (
    <div className={mainstyles.previewWrapper}>
      <div className={mainstyles.ResumeSmall}>
        {ResumeContent}
      </div>
    </div>
  );
}