"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template3({ data, size }: Props) {
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
       <div className ={size == "full" ? mainstyles.ResumeFull : mainstyles.ResumeSmall } >
      
      <div className="w-[210mm] h-[297mm] mx-auto bg-[#f4f4f4] relative flex p-[5mm] box-border overflow-hidden">
    
      <div className="w-[60%] relative before:content-[''] before:absolute before:top-1.25 before:left-4 before:w-[82%] before:h-[94%] before:bg-[#2f394f] before:rounded-[17.5px] before:z-0">
        
        <div className="min-w-100 h-30 bg-[#c9cad8] rounded-[50px] py-[17.5px] px-[22.5px] flex justify-center items-center absolute -right-64 z-10">
          <h3 className="m-0 text-[27px] font-extrabold text-[#111827] tracking-[0.5px]">
            {data.firstName} {data.lastName}
          </h3>
        </div>

        <div className="relative z-2 mt-20 ml-24">
          <div className="relative">
            <Image 
                src={data.profileImg || "/user.png"} 
                alt="Profile" 
                width={160} 
                height={160} 
                className="w-40 h-40 border-[5px] border-white rounded-full relative object-cover" 
            />
          </div>
        </div>
         
        <div className="relative z-2 w-70 bg-[#c9cad8] rounded-sm p-4.75 mt-[47.5px] ml-[-27.5px]">
          <div className="flex items-center gap-1.75 m-[0_0_1.25rem_1.75rem]">
            <h2 className="m-0 text-[22.5px] text-[#111]">About Me</h2>
          </div>

          <p className="m-[0_0_0_1.75rem] text-[16px] leading-[1.6] text-[#111] text-justify">
            {data.aboutMe}
          </p>
        </div>

        <div className="relative z-2 mt-5 ml-[0.95rem] text-white">
          <div className="w-60 h-14 bg-[#d2d3df] text-[#111] py-3 px-3 my-10 mx-0">
            <h3 className="m-0 text-[22.5px]">Contact me</h3>
          </div>

          <div className="flex items-center gap-2.25 m-[0_0_1.25rem_0.75rem]">
              <Image src="/icon/phone.png" alt="Phone" width={40} height={40} className="w-10 h-10" />
            <span className="text-[16px]">{data.contact.phoneNumber}</span>
          </div>

          <div className="flex items-center gap-2.25 m-[0_0_1.25rem_0.75rem]">
            <Image src="/icon/mail.png" alt="Email" width={40} height={40} className="w-10 h-10" />
            <span className="text-[16px]">{data.email}</span>
          </div>

          <div className="flex items-center gap-2.25 m-[0_0_1.25rem_0.75rem]">
              <Image src="/icon/location.png" alt="Address" width={40} height={40} className="w-10 h-10" />
            <span className="text-[16px]">{data.contact.address}</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[58%] pt-30 pr-0 pb-0 pl-5 box-border relative z-2">

        {/* EDUCATION */}
        <section className="mt-8.75">
          <div className="flex items-center gap-2 mb-[17.5px]">
            <div className="w-2.25 h-2.25 border-2 border-[#2f394f] rounded-full"></div>
            <h2 className="m-0 text-[25px] font-extrabold text-[#1f2a44]">EDUCATION</h2>
          </div>

          <div className="border-l border-[#aeb0b9] ml-1 pl-3.5">
            <div className="mb-5.25">
              <h4 className="m-[0_0_5px_0] text-[20px] font-extrabold text-[#1d2436]">Education Level</h4>
              <h3 className="m-0 text-[18px] font-normal text-[#1d2436] mb-5">{data.education.level}</h3>

              <h4 className="m-[0_0_5px_0] text-[20px] font-extrabold text-[#1d2436]">Institution</h4>
              <h3 className="m-0 text-[18px] font-normal text-[#1d2436] mb-5">{data.education.university}</h3>

              <h4 className="m-[0_0_5px_0] text-[20px] font-extrabold text-[#1d2436]"> Major</h4>
              <h3 className="m-0 text-[18px] font-normal text-[#1d2436] mb-5">{data.education.major}</h3>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mt-8.75">
          <div className="flex items-center gap-2 mb-[17.5px]">
            <div className="w-2.25 h-2.25 border-2 border-[#2f394f] rounded-full"></div>
            <h2 className="m-0 text-[25px] font-extrabold text-[#1f2a44]">WORK EXPERIENCE</h2>
          </div>

          <div className="flex flex-col gap-6.25">
            <div>
            {data.experience?.map((experience, idx) => (
              <div key={idx} className="border-l border-[#aeb0b9] ml-1 pl-3.5">
                <h4 className="m-[0_0_5px_0] text-[20px] font-extrabold text-[#1d2436]">
                    {experience.title} {`(${experience.startDate.slice(0, 4)}-${experience.endDate.slice(0, 4)})`}
                </h4>
                <div className="pl-3.5 ml-[2.5px]">
                  <p className="m-0 text-[16px] leading-[1.7] text-justify text-[#222]">{experience.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="mt-8.75">
          <div className="flex items-center gap-2 mb-[17.5px]">
            <div className="w-2.25 h-2.25 border-2 border-[#2f394f] rounded-full"></div>
            <h2 className="m-0 text-[25px] font-extrabold text-[#1f2a44]">SKILLS</h2>
          </div>

          <div className="border-l border-[#aeb0b9] pl-3.5 ml-1">
           {data.badges?.map((badge, idx) => (
              <div key={idx} className="text-[16px] text-[#1c2235]">
                <p>{badge.badgeName}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="absolute -bottom-6.25 -left-10 w-[120%] h-22.5 bg-[#2f394f] -rotate-6 before:content-[''] before:absolute before:-top-4 before:-left-2.5 before:w-[120%] before:h-6.25 before:bg-[#d8d8d8]"></div>
    
      </div>
    </div>
    </>
  );
}