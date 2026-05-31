"use client"
import { ResumeData } from "./type/resume"
import mainstyles from "./main_style.module.css"
import { useEffect, useState } from "react"

type Props = {
  data: ResumeData;
  size: "full" | "small";
};

const formatResumeDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  
  // ถ้าเป็นเดือน/ปีปัจจุบัน หรือ อนาคต ให้ใช้คำว่า Present
  const isPresent = date.getFullYear() > now.getFullYear() || 
                    (date.getFullYear() === now.getFullYear() && date.getMonth() >= now.getMonth());

  if (isPresent) return "Present";

  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
};

export default function Template1({ data, size }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !data) {
    return <div>Loading...</div>;
  }

  // แยกก้อนเนื้อหาออกมา จะได้ไม่ต้องเขียนซ้ำ
  const ResumeContent = (
    <div className="text-black p-[3.5em]">
      <section className="text-[2.2em] flex justify-center items-center">
        <h2 className="font-semibold">{data.firstName} {data.lastName}</h2>
      </section>
      
      <div className="w-full h-[0.06em] bg-black mb-2.25"></div>

      <section className="text-[16px] flex flex-col items-center gap-1">
        {data.contact.address.length > 40 ? (
          <>
            <p className="leading-[1.2] text-center">{data.contact.phoneNumber} | {data.email}</p>
            <p className="leading-[1.2] text-center">{data.contact.address}</p>
          </>
        ) : (
          <p className="leading-[1.2] text-center">{data.contact.phoneNumber} | {data.email} | {data.contact.address}</p>
        )}
      </section>
      
      <div className="w-full h-[0.06em] bg-black my-2.25"></div>

      <section className="text-[16px] my-[0.5em]">
        <p>{data.aboutMe}</p>
      </section>

      <section className="text-[20px] mt-[0.7em]">
        <h2 className="font-semibold">EDUCATION</h2>
        <div className="w-full h-[0.06em] bg-black mb-[2.5px]"></div>
        <div className="flex justify-between mt-[0.5em]">
          <h5 className="text-[18px] font-bold">{data.education.university}</h5>  
          <h6 className="text-[16px] font-semibold pt-0.5">
            {data.education?.startDate || data.education?.endDate 
              ? `${formatResumeDate(data.education.startDate)} - ${formatResumeDate(data.education.endDate)}` 
              : ""}
          </h6>
        </div>
        <h6 className="text-[16px] font-semibold">{data.education.major}</h6>
        <p className="text-[16px]">{data.education.level}</p>
      </section>

      <section className="text-[20px] mt-[0.7em]">
        <h2 className="font-semibold">EXPERIENCE</h2>
        <div className="w-full h-[0.06em] bg-black mb-[2.5px]"></div>
        {data.experience?.map((experience, idx) => (
          <div key={idx}>
            <section>
              <div className="flex justify-between mt-[0.5em]">
                <h6 className="text-[18px] font-bold">{experience.title}</h6>
                <h6 className="text-[16px] font-semibold pt-0.5">
                  {`${formatResumeDate(experience.startDate)} - ${formatResumeDate(experience.endDate)}`}
                </h6>
              </div>
              <ul className="pl-[1.2em] list-disc">
                <li className="text-[16px] mt-[0.2em]">{experience.description}</li>
              </ul>
              
            </section>
          </div>
        ))}
      </section>

      <section className="text-[20px] mt-[0.7em]">
        <h2 className="font-semibold">SKILLS</h2>
        <div className="w-full h-[0.06em] bg-black mb-[2.5px]"></div>
        <ul className="pl-[1.2em] text-[18px] list-disc">
          {data.badges?.map((badge, idx) => (<li key={idx}>{badge.badgeName}</li>))}
        </ul>
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