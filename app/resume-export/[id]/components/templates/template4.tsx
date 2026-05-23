"use client"
import {ResumeData} from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template4.module.css"
import { useEffect,useState } from "react"
type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template1({ data, size }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    console.log(data)
  const containerClass = isMounted 
    ? (size === "full" ? mainstyles.ResumeFull : mainstyles.ResumeSmall)
    : mainstyles.Resume; 

  if (!data) {
    return <div>Loading...</div>; 
  }
  return (
    <>
        <div className ={size == "full" ? mainstyles.ResumeFull :mainstyles.ResumeSmall } >
        <div className={styles.resume}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img src={data.profileImg} alt="Profile"  className={styles.avatar}/>
        </div>

        <div className={styles.headerText}>
          <h1 style={{color :"white" }}>{data.firstName} {data.lastName}</h1>
         
        </div>
      </header>

      {/* BODY */}
      <div className={styles.body}>
        {/* LEFT SIDEBAR */}
        <aside className={styles.sidebar}>
          <section className={styles.sidebarSection}>
            <h2>CONTACT</h2>

            <div className={styles.contactItem}>
            
              <img src={"/icon/phone.png"} alt="Phone" />
          
            <span>{data.contact.phoneNumber}</span>
          </div>

          <div className={styles.contactItem}>
            <img src={"/icon/mail.png"} alt="Email" />
            <span>{data.email}</span>
          </div>

          <div className={styles.contactItem}>
           
              <img src={"/icon/location.png"} alt="Address" />
          
            <span>{data.contact.address}</span>
          </div>
          </section>

          <section className={styles.sidebarSection}>
            <h2>SKILLS</h2>
      <ul className={styles.skillList}>
            {data.badges?.map((badge, idx) => (
              <div key={idx} className={styles.skillItem}>
                
                <li>{badge.badgeName}</li>
              </div>
            ))} </ul>
          </section>
        </aside>

        {/* RIGHT CONTENT */}
        <main className={styles.content}>
          {/* PROFILE */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconCircle}>
            
              </div>

              <h2>PROFILE</h2>
            </div>

            <div className={styles.timeline}>
              <p>
                {data.aboutMe}
              </p>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconCircle}>
               
              </div>

              <h2>WORK EXPERIENCE</h2>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>

                <div className={styles.timelineContent}>
                   {data.experience?.map((experience,idx)=>(

              <div key={idx} >
                <h3 style={{fontSize: '18px', color: '#1d2436'}}>{experience.title}            {`(${experience.startDate.slice(0,4)}-${experience.endDate.slice(0,4)})`}</h3>
                <div className={styles.jobDescription}>
                  <p>{experience.description}</p>
                </div>
              </div>
            ))}</div>
              </div>

             
            </div>
          </section>

          {/* EDUCATION */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconCircle}>
              
              </div>

              <h2>EDUCATION</h2>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>

                <div className={styles.timelineContent}>
                 
                    <h3>Education Level</h3>
                    <h4>{data.education.level}</h4>

                    <h3>Institution</h3>
                    <h4>{data.education.university}</h4>

                    <h3> Major</h3>
                    <h4>{data.education.major}</h4>
          
                 
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
        </div>
    </>
  );
}