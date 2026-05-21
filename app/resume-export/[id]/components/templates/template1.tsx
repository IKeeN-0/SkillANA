"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template1.module.css"
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
    <div className={styles.bg}>
      <section className={styles.leftSideContainer}>
        <section className={styles.profile}>
          <img className={styles.profileImg} src={data.profileImg} />
        </section>

        <section className={styles.contact}>
          <h2>CONTACT</h2>
          <div className={styles.phone}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
            <p>{data.contact.phoneNumber}</p>
          </div>
          <div className={styles.email}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <p>{data.email}</p>
          </div>
          <div className={styles.address}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />
            </svg>
            <p>{data.contact.address}</p>
          </div>
        </section>

        <div className={styles.lHorizonLine}></div>

        <section className={styles.education}>
          <h2>EDUCATION</h2>
          <h5 className={styles.university}>{data.education.university}</h5>
          <h6 className={styles.major}>{data.education.major}</h6>
          <p className={styles.level}>{data.education.level}</p>
        </section>

        <div className={styles.lHorizonLine}></div>

        <section className={styles.skill}>
          <h2>Skills</h2>
          <ul className={styles.skillList}>
            {data.badges?.map((badge, idx) => (<li key={idx}>{badge.badgeName}</li>))}
          </ul>
        </section>

      </section>

      <div className={styles.verticalLine}></div>

      <section className={styles.rightSideContainer}>
        <section className={styles.name}>
          <h2>{data.firstName}</h2>
          <h2>{data.lastName}</h2>
        </section>

        <div className={styles.rHorizonLine}></div>

        <section className={styles.aboutme}>
          <h2>ABOUT ME</h2>
          <p>{data.aboutMe}</p>
        </section>

        <section className={styles.exp}>
          <h2>EXPERIENCE</h2>
          {data.experience?.map((experience, idx) => (
            <div key={idx} className={styles.expBox}>
              <section className={styles.expContent}>
                <h6 className={styles.title}>{experience.title}</h6>
                <h6 className={styles.date}>{`${experience.startDate.slice(0, 4)} - ${experience.endDate.slice(0, 4)}`}</h6>
                <p className={styles.description}>{experience.description}</p>
              </section>
            </div>
          ))}
        </section>

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