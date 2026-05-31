"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

export default function Template2({ data, size }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !data) {
    return <div>Loading...</div>;
  }

  const ResumeContent = (
    <div className="text-[#194785] w-full h-full relative bg-[url('/resumes/resume_bg1.png')] bg-cover bg-center bg-no-repeat flex">
      
      <section className="flex flex-col pt-20 pl-9 w-90">
        
        <section className="bg-[#194785] w-55 h-55 rounded-full flex justify-center items-center mt-5 ml-7.5">
          <Image 
            className="w-50 h-50 rounded-full object-cover" 
            src={data.profileImg || "/user.png"} 
            alt="Profile Image"
            width={200}
            height={200}
            priority
          />
        </section>

        <section className="flex flex-col mt-15 ml-[1.55rem]">
          <h2 className="mb-3 text-[28px]">CONTACT</h2>
          
          <div className="flex text-[12.5px] font-medium items-center pb-1.25">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white bg-[#194785] rounded-full w-6.5 h-6.5 p-1 overflow-visible mr-[0.4rem]">
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
            <p>{data.contact.phoneNumber}</p>
          </div>
          
          <div className="flex text-[12.5px] font-medium items-center pb-1.25">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white bg-[#194785] rounded-full w-6.5 h-6.5 p-1 overflow-visible mr-[0.4rem]">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <p>{data.email}</p>
          </div>
          
          <div className="flex text-[12.5px] font-medium items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white bg-[#194785] rounded-full w-6.5 h-6.5 p-1 overflow-visible mr-[0.4rem]">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />
            </svg>
            <p className="leading-[1.2]">{data.contact.address}</p>
          </div>
        </section>

        <div className="bg-[#194785] w-[90%] h-[0.15rem] rounded-[10px] mt-7 ml-[1.55rem]"></div>

        <section className="flex flex-col mt-6 ml-[1.55rem]">
          <h2 className="mb-3 text-[28px]">EDUCATION</h2>
          <h5 className="text-[16px]">{data.education.university}</h5>
          <h6 className="text-[12px]">{data.education.major}</h6>
          <p className="text-[12px]">{data.education.level}</p>
        </section>

        <div className="bg-[#194785] w-[90%] h-[0.15rem] rounded-[10px] mt-7 ml-[1.55rem]"></div>

        <section className="flex flex-col mt-6 ml-[1.55rem]">
          <h2 className="mb-3 text-[28px]">Skills</h2>
          <ul className="list-none p-0 m-0">
            {data.badges?.map((badge, idx) => (<li key={idx} className="text-[12px]">{badge.badgeName}</li>))}
          </ul>
        </section>

      </section>

      <div className="w-1 h-[90%] bg-[#194785] rounded-[10px] my-auto mx-6"></div>

      <section className="flex flex-col pt-30 w-87.5">
        <section className="text-[32px] leading-[1.2]">
          <h2>{data.firstName}</h2>
          <h2>{data.lastName}</h2>
        </section>

        <div className="bg-[#194785] w-[90%] h-[0.15rem] rounded-[10px] mt-4"></div>

        <section className="flex flex-col mt-6">
          <h2 className="mb-3 text-[28px]">ABOUT ME</h2>
          <p className="text-[14px]">{data.aboutMe}</p>
        </section>

        <section className="flex flex-col mt-6">
          <h2 className="mb-3 text-[28px]">EXPERIENCE</h2>
          {data.experience?.map((experience, idx) => (
            <div key={idx}>
              <section>
                <h6 className="text-[18px]">{experience.title}</h6>
                <h6 className="text-[14px]">{`${experience.startDate.slice(0, 4)} - ${experience.endDate.slice(0, 4)}`}</h6>
                <p className="text-[14px] mb-4">{experience.description}</p>
              </section>
            </div>
          ))}
        </section>

      </section>
    </div>
  );

  return size === "full" ? (
    <div className={mainstyles.ResumeFull}>
      {ResumeContent}
    </div>
  ) : (
      <div className={mainstyles.ResumeSmall}>
        {ResumeContent}
      </div>
  );
}