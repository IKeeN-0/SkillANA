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
    <div className="flex justify-between my-6 w-[68%] box-border transition-all duration-300 rounded-2xl">
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
        <div className="flex flex-col items-center gap-10">
          <ProfileHeader />

          <div className="flex gap-6 ml-0 h-fit ">
            <Contact /> 
            <Education />
          </div>
          
          <div>
            <AboutMe />
          </div>
          
          <div>
            <Exp />
          </div>

          <div className="bg-white w-350 h-0.5"></div>

          <button 
            className="my-15 w-45 h-12 text-[1em] font-bold bg-[red] text-white border-none rounded-[0.625rem] cursor-pointer transition-all duration-200 hover:bg-[rgb(160,6,6)] active:scale-90" 
            onClick={() => {
              localStorage.removeItem("token");
              window.location.replace('/login');
          }}>
            Log Out
          </button>
        </div>
        <Popup />
      
    </EditProvider>
    
  );
}