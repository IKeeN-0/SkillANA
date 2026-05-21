"use client"
import {ResumeData} from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template2.module.css"
import { useEffect,useState } from "react"


type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template4({ data, size }: Props) {
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
    
      <div className={styles.leftPanel}>
        <div className={styles.header}>
          <h3>{data.firstName} {data.lastName}</h3>
         
        </div>
        <div className={styles.profileWrapper}>
          <div className={styles.profileCircle}>
            <img src={data.profileImg} alt="Profile" />
          </div>
        </div>
         
        <div className={styles.aboutCard}>
          <div className={styles.sectionTitle}>
          
            <h2>About Me</h2>
          </div>

          <p>
            {data.aboutMe}
          </p>
        </div>

        <div className={styles.contactSection}>
          <div className={styles.contactHeader}>
            <h3>Contact me</h3>
          </div>

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
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.rightPanel}>
          {/* HEADER */}
         

        {/* EDUCATION */}
        <section className={styles.section}>
          <div className={styles.headingRow}>
            <div className={styles.smallCircle}></div>
            <h2>EDUCATION</h2>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h4>Education Level</h4>
              <h3>{data.education.level}</h3>

              <h4>Institution</h4>
              <h3>{data.education.university}</h3>

              <h4> Major</h4>
              <h3>{data.education.major}</h3>
             
            </div>

            
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className={styles.section}>
          <div className={styles.headingRow}>
            <div className={styles.smallCircle}></div>
            <h2>WORK EXPERIENCE</h2>
          </div>

          <div className={styles.experience}>
            <div className={styles.job}>
            {data.experience?.map((experience,idx)=>(

              <div key={idx} className={styles.timeline}>
                <h4 style={{fontSize: '20px', color: '#1d2436'}}>{experience.title} {`(${experience.startDate.slice(0,4)}-${experience.endDate.slice(0,4)})`}</h4>
                <div className={styles.jobDescription}>
                  <p>{experience.description}</p>
                </div>
              </div>
            ))}
         

              
            </div>

            
          </div>
        </section>

        {/* SKILLS */}
        <section className={styles.section}>
          <div className={styles.headingRow}>
            <div className={styles.smallCircle}></div>
            <h2>SKILLS</h2>
          </div>

          <div className={styles.skills}>
           {data.badges?.map((badge, idx) => (
              <div key={idx} className={styles.skillItem}>
                
                <p>{badge.badgeName}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* BOTTOM SHAPE */}
      <div className={styles.bottomShape}></div>
    </div>
  

      
 
            </div>
    </>
  );
}