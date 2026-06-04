'use client';

import AboutMe from "./aboutme/about-me";
import Contact from "./genInfo/contact"
import Education from "./genInfo/education";
import Exp from "./experience/experience";
import ProfileImg from "./profileImg/profile-img";
import Popup from "./popup/popup";
import { EditProvider, useEditContext, ProfileData } from "./edit";
import { Navbar } from "@/app/_global_components/navbar/navbar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfileHeader = () => {
  const { isEdit, setEditing } = useEditContext();
  return (
    /* 🌟 ปล่อยให้ความกว้างเป็น w-full เพื่ออิงตามขอบกล่องแม่ใหญ่ที่ครอบไว้ */
    <div className="flex justify-between w-full box-border transition-all duration-300 rounded-2xl max-md:flex-col max-md:gap-6 max-md:items-center">
      <ProfileImg />
      
      <div className={`flex justify-center items-center ${isEdit ? "invisible" : "visible"}`}>
        <button 
          className="w-40 py-3 text-[1.2em] font-bold bg-[#5F28CD] text-white border-none rounded-[0.625rem] cursor-pointer transition-all duration-200 hover:bg-[#3e1394] active:scale-[0.98]" 
          onClick={() => setEditing(true)}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default function UseClientPage() {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodeToken = token ? jwtDecode(token) : null;
    const userId = decodeToken ? (decodeToken as { id: string }).id : null;

    if (!token) {
      window.location.replace('/login');
      return;
    }

    const fetchData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        if (res.ok) {
          const profileData = await res.json();
          setData(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
      </div>
    );
  }

  return (
      <EditProvider initialData={data}>
        <Navbar />
        
        {/* 🌟 คีย์เวิร์ดสำคัญ: ใช้กล่องนี้เป็นกล่องแม่คุมความกว้างและจัดกึ่งกลางหน้าจอ (ขอบซ้าย-ขวา ทุกอย่างจะตรงกันเป๊ะ) */}
        <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] max-w-300 mx-auto flex flex-col items-center gap-10 py-6">
          
          {/* ข้อมูลหัวโปรไฟล์ */}
          <ProfileHeader />

          {/* 🌟 ปรับเป็นระบบ Grid คุมให้แบ่ง 2 ฝั่งเท่ากันในคอม และเป็นแถวเดี่ยวบนมือถือ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Contact /> 
            <Education />
          </div>
          
          {/* ข้อมูล About Me ขยายเต็มกรอบแม่ */}
          <div className="w-full">
            <AboutMe />
          </div>
          
          {/* ข้อมูล Experience ขยายเต็มกรอบแม่ */}
          <div className="w-full">
            <Exp />
          </div>

          {/* ปรับเส้นคั่นให้ยาวเท่าขอบองค์ประกอบพอดี */}
          <div className="bg-white/20 w-full h-0.5 my-4"></div>

          <button 
            className="w-45 h-12 text-[1em] font-bold bg-[red] text-white border-none rounded-[0.625rem] cursor-pointer transition-all duration-200 hover:bg-[rgb(160,6,6)] active:scale-90" 
            onClick={() => {
              localStorage.removeItem("token");
              window.location.replace('/');
          }}>
            Log Out
          </button>
        </div>
        
        <Popup />
    </EditProvider>
  );
}