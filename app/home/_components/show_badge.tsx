"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface Badge {
  id: string;
  badgeName: string;
  imgUrl: string;
  earnedAt: string;
}

interface UserData {
  badges: Badge[];
}

export function Show_badge() {
    const [user, setUser] = useState<UserData | null>(null);
    const [, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(token) as { id: string };
                const userId = decoded.id;

                const res = await fetch(`/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const profileData = await res.json();
                    setUser(profileData);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="h-auto xl:h-120 mx-auto p-4 md:p-8 rounded-[0.625rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)]">
            
            {/* หัวข้อ: มือถือ 20px, iPad 24px, โน้ตบุ๊กขึ้นไป 1.7rem (ตามเดิม) */}
            <h1 className="text-xl md:text-2xl xl:text-[1.7rem] font-bold mb-2">
                Your Latest Achievements
            </h1>

            {/* คำอธิบาย: มือถือ 14px, iPad 16px, โน้ตบุ๊กขึ้นไป 1.1rem (ตามเดิม) และลด margin ล่างในมือถือให้แคบลงนิดนึง */}
            <div className="text-sm md:text-base xl:text-[1.1rem] mb-4 xl:mb-7 opacity-90">
                A quick look at your most recent milestones. Explore your full collection to track all your growing skills.
            </div>

            <Link href='/collections' className="bg-[#5F28CD] py-3 px-5 text-sm md:py-2.5 md:px-5 md:text-base xl:py-[0.937rem] xl:px-7.5 xl:text-[1.125rem] rounded-[0.625rem] font-semibold inline-block text-white duration-300 ease hover:bg-[#4410ab]">
                See Your Collection
            </Link>

            <div className="mt-6 md:mt-14 flex flex-col items-center justify-end relative w-full pt-4 md:pt-10">
                {!user ? (
                    <div className="text-lg md:text-xl xl:text-[1.5rem] h-25 mx-auto pb-2">Loading...</div>
                ) : user.badges && user.badges.length > 0 ? (
                    
                    <div className="flex flex-nowrap justify-center gap-2 sm:gap-3 md:gap-2 lg:gap-3 xl:gap-5 2xl:gap-6 mx-auto mb-[0.1rem] w-full px-2 sm:px-4 overflow-hidden">
                        {[...user.badges]
                            .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
                            .slice(0, 8) 
                            .map((badge: any, index: number) => {
                                
                                let visibilityClass = "hidden";
                                
                                if (index < 4) {
                                    visibilityClass = "block";
                                } else if (index < 5) {
                                    visibilityClass = "hidden md:block";
                                } else if (index < 7) {
                                    visibilityClass = "hidden md:block xl:hidden 2xl:block";
                                } else if (index === 7) {
                                    visibilityClass = "hidden md:block xl:hidden";
                                }

                                return (
                                    <div 
                                        key={badge.id || `badge-${index}`}
                                        className={`drop-shadow-[5px_2px_2px_rgba(0,0,0,0.4)] shrink-0 ${visibilityClass}`}
                                    >
                                        <Image 
                                            src={badge.imgUrl.startsWith('/') || badge.imgUrl.startsWith('http') ? badge.imgUrl : `/${badge.imgUrl}`} 
                                            alt={badge.badgeName} 
                                            width={120}
                                            height={120}
                                            className="object-contain w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-23 2xl:h-23"
                                        />
                                    </div>
                                );
                            })}
                    </div>
                ) : (
                    <p className="text-base md:text-lg xl:text-[1.2rem] mx-auto pb-2 mt-6 sm:mt-8 lg:mt-12 2xl:mt-14 mb-[0.1rem]">
                        - You don't have a badge yet -
                    </p>
                )}
                
                <div className="bg-[#4D256E] w-full h-3 rounded-[0.625rem] shadow-[0.312rem_0.187rem_0.312rem_0_rgba(0,0,0,0.4)]"></div>
            </div>
        </div>
    );
};