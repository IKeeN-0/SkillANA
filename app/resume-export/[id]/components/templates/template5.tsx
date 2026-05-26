"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template5({ data, size }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    console.log(data)

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
    <>
        <div className={size == "full" ? mainstyles.ResumeFull : mainstyles.ResumeSmall} >
          
          <main className="w-full h-full grid grid-cols-[1fr_1.5fr] text-white">
              
              {/* แถบด้านซ้าย */}
              <section className="bg-[#374151]">
                  <section className="flex flex-col w-full h-full items-center justify-evenly py-[1em]">
                      
                      <div className="w-full h-[20%] flex justify-center items-center">
                        <Image 
                            className="w-[70%] h-[90%] rounded-full border-4 border-solid border-white object-cover" 
                            src={data.profileImg || "/user.png"} 
                            alt="Profile Image"
                            width={150}
                            height={150}
                        />
                      </div>

                      <div className="w-[80%] flex flex-col gap-[1em]">
                          <div className="flex gap-[1em] w-full items-end">
                              <Image className="w-[15%] h-[80%] invert object-contain" src="/icon/user.png" alt="user icon" width={30} height={30} />
                              <h3 className="m-0">About Me</h3>
                          </div>

                          <div className="w-[90%] text-[x-small]">
                            <p className="m-0 text-justify [text-justify:inter-word] hyphens-auto">
                                {data.aboutMe}
                            </p>
                          </div>
                      </div>

                      <div className="w-[80%] h-[17%] flex flex-col justify-around">
                          <div className="flex gap-[1em] items-center">
                              <Image className="w-[15%] h-[80%] invert object-contain" src="/icon/contact.png" alt="contact icon" width={30} height={30} />
                              <h3 className="m-0">Contact</h3>
                          </div>
                          <div className="flex gap-[0.5em] items-center">
                              <Image className="w-[10%] h-[75%] invert object-contain" src="/icon/phone.png" alt="phone" width={20} height={20} />
                              <p className="m-0 text-[x-small]">{data.contact.phoneNumber}</p>
                          </div>
                          <div className="flex gap-[0.5em] items-center">
                               <Image className="w-[10%] h-[75%] invert object-contain" src="/icon/mail.png" alt="mail" width={20} height={20} />
                               <p className="m-0 text-[x-small]">{data.email}</p>
                          </div>
                          <div className="flex gap-[0.5em] items-center">
                             <Image className="w-[10%] h-[75%] invert object-contain" src="/icon/location.png" alt="location" width={20} height={20} />
                             <p className="m-0 text-[x-small]">{data.contact.address}</p>
                          </div>
                      </div>

                      <div className="w-[80%] flex flex-col gap-[0.2em]">
                        <div className="flex gap-[1em] items-center">
                              <Image className="w-[12%] h-[75%] invert object-contain" src="/icon/setting.png" alt="skills" width={30} height={30} />
                              <h3 className="m-0">Skills</h3>
                          </div>
                          <ul className="text-[x-small] pl-[2em] flex flex-col gap-[0.75em] m-0">
                              {data.badges?.map((badge,idx) => (
                                  <li key={idx}>{badge.badgeName}</li>
                              ))}
                          </ul>
                      </div>
                  </section>
              </section>

              {/* แถบด้านขวา */}
              <section className="grid grid-rows-[25%_75%] pl-[3em]">
                  
                  <div className="flex flex-col justify-center text-[x-large] text-[#374151]">
                      <h2 className="m-0">{data.firstName}</h2>
                      <h2 className="m-0">{data.lastName}</h2>
                  </div>
                  
                  <div className="flex flex-col justify-evenly">
                      <div className="text-[#374151] flex gap-[1em] items-center text-[large]">
                              <Image 
                                className="w-[12%] h-[90%] object-contain filter-[invert(21%)_sepia(13%)_saturate(1065%)_hue-rotate(182deg)_brightness(94%)_contrast(92%)]" 
                                src="/icon/education.png" 
                                alt="education" 
                                width={40} 
                                height={40} 
                              />
                              <h3 className="m-0">Education</h3>
                      </div>

                      <div className="flex w-full h-[10%] gap-[1em] items-center">
                          <div className="relative w-1 h-[85%] bg-[#374151]">
                              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#374151] -left-0.75 top-0"></div> {/* .dot1 */}
                              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#374151] -left-0.75 top-full"></div> {/* .dot2 */}
                          </div>

                          <section className="flex flex-col text-[#374151] gap-[0.25em]">
                            <h6 className="text-[small] m-0">{data.education.university}</h6>
                            <h6 className="text-[small] m-0">{data.education.major}</h6>
                            <p className="text-[x-small] m-0">{data.education.level}</p>
                          </section>
                      </div>

                       <div className="text-[#374151] flex gap-[1em] items-center text-[large]">
                              <Image 
                                className="w-[12%] h-[75%] object-contain filter-[invert(21%)_sepia(13%)_saturate(1065%)_hue-rotate(182deg)_brightness(94%)_contrast(92%)]" 
                                src="/icon/suitcase.png" 
                                alt="experience" 
                                width={40} 
                                height={40} 
                              />
                              <h3 className="m-0">Experience</h3>
                      </div>
                      
                      {data.experience?.map((experience, idx) =>(
                            <div key={idx} className="flex w-full h-[10%] gap-[1em] items-center">
                                <div className="relative w-1 h-[85%] bg-[#374151]">
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#374151] -left-0.75 top-0"></div>
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#374151] -left-0.75 top-full"></div>
                                </div>

                                <section className="flex flex-col text-[#374151] gap-[0.25em]">
                                    <h6 className="text-[small] m-0">{`(${experience.startDate.slice(0,4)}-${experience.endDate.slice(0,4)})`}</h6>
                                    <h6 className="text-[small] m-0">{experience.title}</h6>
                                    <p className="text-[x-small] m-0">{experience.description}</p>
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