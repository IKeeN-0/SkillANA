"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template4({ data, size }: Props) {
    const [, setIsMounted] = useState(false);
    
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
            
            <div className="w-[210mm] min-h-fit mx-auto bg-[#f5f5f5] text-[#2f3a4c] overflow-hidden">
                
                {/* HEADER */}
                <header className="bg-[#2f3a4c] flex items-center pt-[0.35rem] px-10.5 pb-[1.05rem]">
                    
                    <div className="w-[6.3rem] h-[6.3rem] border-[3.5px] border-solid border-white rounded-full flex items-center justify-end ml-16 shrink-0">
                        <Image 
                            src={data.profileImg || "/user.png"} 
                            alt="Profile"  
                            width={120}
                            height={120}
                            className="w-[5.95rem] h-[5.95rem] object-cover rounded-full"
                        />
                    </div>

                    <div className="ml-44">
                        <h1 className="text-white text-[32px] opacity-90 m-0">
                            {data.firstName} {data.lastName}
                        </h1>
                    </div>
                </header>

                {/* BODY */}
                <div className="flex">
                    
                    {/* LEFT SIDEBAR */}
                    <aside className="w-[42%] bg-[#d9d9d9] pt-10.5 pr-[24.5px] pb-0 pl-[0.7rem] h-[62.4rem] relative">
                        
                        <section className="mb-[1.05rem]">
                            <h2 className="text-[25.2px] mb-[1.05rem] tracking-[2.1px] border-b-2 border-solid border-[#2f3a4c] pb-1.75">
                                CONTACT
                            </h2>

                            <div className="flex items-center m-[0_0_1.05rem_0] gap-[0.7rem] text-[12.6px]">
                                <Image src="/icon/phone.png" alt="Phone" width={24} height={24} className="w-[1.4rem] h-[1.4rem]" />
                                <span>{data.contact.phoneNumber}</span>
                            </div>

                            <div className="flex items-center m-[0_0_1.05rem_0] gap-[0.7rem] text-[12.6px]">
                                <Image src="/icon/mail.png" alt="Email" width={24} height={24} className="w-[1.4rem] h-[1.4rem]" />
                                <span>{data.email}</span>
                            </div>

                            <div className="flex items-center m-[0_0_1.05rem_0] gap-[0.7rem] text-[12.6px]">
                                <Image src="/icon/location.png" alt="Address" width={24} height={24} className="w-[1.4rem] h-[1.4rem]" />
                                <span>{data.contact.address}</span>
                            </div>
                        </section>

                        <section className="mb-[1.05rem]">
                            <h2 className="text-[25.2px] mb-[1.05rem] tracking-[2.1px] border-b-2 border-solid border-[#2f3a4c] pb-1.75">
                                SKILLS
                            </h2>
                            <ul className="pl-[1.05rem] m-0">
                                {data.badges?.map((badge, idx) => (
                                    <div key={idx} className="mb-[12.6px] text-[15.4px]">
                                        <li className="mb-[12.6px] text-[15.4px]">{badge.badgeName}</li>
                                    </div>
                                ))} 
                            </ul>
                        </section>
                    </aside>

                    {/* RIGHT CONTENT */}
                    <main className="w-[58%] py-10.5 px-8.75">
                        
                        {/* PROFILE */}
                        <section className="mb-7">
                            <div className="flex items-center gap-3.5 mb-[1.05rem]">
                                <div className="w-[1.4rem] h-[1.33rem] bg-[#2f3a4c] text-white rounded-full flex items-center justify-center text-[14px] shrink-0"></div>
                                <h2 className="text-[16.8px] tracking-[2.1px] border-b-2 border-solid border-[#2f3a4c] w-full pb-1.75">
                                    PROFILE
                                </h2>
                            </div>

                            <div className="relative ml-[0.7rem] pl-[0.7rem] before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-[#9a9a9a]">
                                <p className="text-[14.7px] leading-[1.19]">
                                    {data.aboutMe}
                                </p>
                            </div>
                        </section>

                        {/* EXPERIENCE */}
                        <section className="mb-7">
                            <div className="flex items-center gap-3.5 mb-[1.05rem]">
                                <div className="w-[1.4rem] h-[1.33rem] bg-[#2f3a4c] text-white rounded-full flex items-center justify-center text-[14px] shrink-0"></div>
                                <h2 className="text-[16.8px] tracking-[2.1px] border-b-2 border-solid border-[#2f3a4c] w-full pb-1.75">
                                    WORK EXPERIENCE
                                </h2>
                            </div>

                            <div className="relative ml-[0.7rem] pl-[0.7rem] before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-[#9a9a9a]">
                                <div className="relative mb-8.75">
                                    <div className="timelineDot"></div>

                                    <div>
                                        {data.experience?.map((experience,idx) => (
                                            <div key={idx} >
                                                <h3 className="text-[18px] text-[#1d2436] m-0">
                                                    {experience.title} {`(${experience.startDate.slice(0,4)}-${experience.endDate.slice(0,4)})`}
                                                </h3>
                                                <div className="mb-[0.42rem]">
                                                    <p className="text-[14.7px] leading-[1.19] m-0">{experience.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* EDUCATION */}
                        <section className="mb-7">
                            <div className="flex items-center gap-3.5 mb-[1.05rem]">
                                <div className="w-[1.4rem] h-[1.33rem] bg-[#2f3a4c] text-white rounded-full flex items-center justify-center text-[14px] shrink-0"></div>
                                <h2 className="text-[16.8px] tracking-[2.1px] border-b-2 border-solid border-[#2f3a4c] w-full pb-1.75">
                                    EDUCATION
                                </h2>
                            </div>

                            <div className="relative ml-[0.7rem] pl-[0.7rem] before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-[#9a9a9a]">
                                <div className="relative mb-8.75">
                                    <div className="timelineDot"></div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-[16.8px] m-0 font-bold">Education Level</h3>
                                        <h4 className="text-[15.4px] mb-[0.42rem] font-normal m-0">{data.education.level}</h4>

                                        <h3 className="text-[16.8px] m-0 font-bold">Institution</h3>
                                        <h4 className="text-[15.4px] mb-[0.42rem] font-normal m-0">{data.education.university}</h4>

                                        <h3 className="text-[16.8px] m-0 font-bold"> Major</h3>
                                        <h4 className="text-[15.4px] mb-[0.42rem] font-normal m-0">{data.education.major}</h4>
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