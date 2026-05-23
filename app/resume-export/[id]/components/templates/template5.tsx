"use client"
import {ResumeData} from "./type/resume"
import mainstyles from "./main_style.module.css"
import styles from "./template5.module.css"
import { useEffect,useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template2({ data, size }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    console.log(data)
  const containerClass = isMounted 
    ? (size === "full" ? mainstyles.ResumeFull : mainstyles.ResumeSmall)
    : mainstyles.Resume; 

  if (!data) {
    return <div>Loading...</div>; // หรือ return null; ถ้าไม่อยากให้แสดงอะไรเลย
  }
  return (
    <>
        <div className ={size == "full" ? mainstyles.ResumeFull :mainstyles.ResumeSmall } >
          <main className = {styles.thisResume}>
              <section style={{backgroundColor : "#374151"}}>
                  <section className={styles.leftSideContainer}>
                      
                      <div className={styles.imgBox}>
                        <img className={styles.profileImg} src={data.profileImg}></img>
                      </div>
                      <div className = {styles.aboutMeBox}>
                          <div style={{display : "flex", gap : "1em" , width : "100%", alignItems : "flex-end"}}>
                              <img className={styles.iconStyle}  src={"/icon/user.png"}></img>
                              <h3>About Me</h3>
                          </div>

                          <div className={styles.aboutMeContent}>
                            <p style={{ textAlign: "justify", textJustify : "inter-word",hyphens: "auto"}}>{data.aboutMe}</p>
                          </div>
                      </div>

                      <div className={styles.contactBox}>
                          <div className = {styles.contactContentBoxTitle}>
                              <img className={styles.iconStyle} src={"/icon/contact.png"}></img>
                              <h3>Contact</h3>
                          </div>
                          <div className = {styles.contactContentBox}>
                              <img style={{width : "10%", height : "75%" , filter : "invert(1)"}} src={"/icon/phone.png"}></img>
                              <p>{data.contact.phoneNumber}</p>
                          </div>
                          <div className = {styles.contactContentBox}>
                               <img style={{width : "10%", height : "75%" , filter : "invert(1)"}} src={"/icon/mail.png"}></img>
                               <p>{data.email}</p>
                          </div>
                          <div className = {styles.contactContentBox}>
                             <img style={{width : "10%", height : "75%" , filter : "invert(1)"}} src={"/icon/location.png"}></img>
                             <p>{data.contact.address}</p>
                          </div>
                      </div>

                      <div className={styles.skillBox}>
                        <div className = {styles.contactContentBoxTitle}>
                              <img style={{width : "12%", height : "75%" , filter : "invert(1)"}} src={"/icon/setting.png"}></img>
                              <h3>Skills</h3>
                          </div>
                          <ul className={styles.skillList}>
                              {data.badges?.map((badge,idx)=>(<li key={idx}>{badge.badgeName}</li>))}
                          </ul>
                      </div>
                      <div className={styles.languageBox}>
                         <div className = {styles.languageBoxTitle}>
                              <img style={{width : "12%", height : "12%" , filter : "invert(1)"}} src={"/icon/language.png"}></img>
                              <h3>Languages</h3>
                          </div>

                          <ul className={styles.languageList}>
                              <li>{"English B2"}</li>
                              <li>{"Thai Native"}</li>
                          </ul>
                      </div>

                  </section>
              </section>
              <section className={styles.rightSideContainer}>
                  
                  <div className={styles.nameContainer}>
                      <h2>{data.firstName}</h2>
                      <h2>{data.lastName}</h2>
                  </div>
                  
                  <div className={styles.rightSideContent}>
                      <div className = {styles.rightSideContentTitle}>
                              <img style={{width : "12%", height : "90%" }} src={"/icon/education.png"}></img>
                              <h3>Education</h3>
                      </div>

                      <div className={styles.educationBox}>
                          <div className={styles.timeLine}>
                              <div className={styles.dot1}></div>
                              <div className={styles.dot2}></div>
                          </div>

                          <section className={styles.educationContent}>
                            <h6 style={{fontSize : "small"}}>{data.education.university}</h6>
                            <h6 style={{fontSize : "small"}}>{data.education.major}</h6>
                            <p style={{fontSize : "x-small"}}>{data.education.level}</p>
                          </section>
                      </div>
                       <div className = {styles.rightSideContentTitle}>
                              <img style={{width : "12%", height : "75%" }} src={"/icon/suitcase.png"}></img>
                              <h3>Experience</h3>
                      </div>
                      {data.experience?.map((experience, idx) =>(
                            <div key={idx} className={styles.educationBox}>
                            <div key={idx} className={styles.timeLine}>
                                <div className={styles.dot1}></div>
                                <div className={styles.dot2}></div>
                            </div>

                            <section className={styles.educationContent}>
                                <h6 style={{fontSize : "small"}}>{`(${experience.startDate.slice(0,4)}-${experience.endDate.slice(0,4)})`}</h6>
                                <h6 style={{fontSize : "small"}}>{experience.title}</h6>
                                <p style={{fontSize : "x-small"}}>{experience.description}</p>
                            </section>
                        </div>
                      ))}



                  </div>
              </section>

          </main>
        </div>
    </>
  );
}