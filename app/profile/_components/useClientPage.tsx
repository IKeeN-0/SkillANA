'use client';

import AboutMe from "./aboutme/about-me";
import Contact from "./genInfo/contact"
import Education from "./genInfo/education";
import Exp from "./experience/experience";
import ProfileImg from "./profileImg/profile-img";
import Popup from "./popup/popup";
import { EditProvider, useEditContext, ProfileData } from "./edit";
import style from "../profile.module.css";
import { Navbar } from "@/app/_global_components/navbar/navbar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


const ProfileHeader = () => {
  const { isEdit, setEditing } = useEditContext();
  return (
    <div className={style.profileHeader}>
      <ProfileImg />
      <div className={`${style.editButtonWrapper} ${isEdit ? style.hidden : style.visible}`}>
        <button className={style.editButton} onClick={() => setEditing(true)}>Edit Profile</button>
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
      <div className={style.loadingWrapper}>
       
      </div>
    );
  }

  return (
    <EditProvider initialData={data}>
      <Navbar />
      <ProfileHeader />
      <div className={style.mainContainer}>
        <div className={style.generalInfo}>
          <Contact /> 
          <Education />
        </div>
        <div className={style.aboutMe}>
          <AboutMe />
        </div>
        <div className={style.experience}>
          <Exp />
        </div>
        <p className={style.divider}></p>
        <button className={style.logout} onClick={() => {
            localStorage.removeItem("token");
            window.location.replace('/login');
        }}>Log Out</button>
      </div>
      <Popup />
    </EditProvider>
  );
}