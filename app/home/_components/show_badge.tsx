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
    const [loading, setLoading] = useState(true);

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
            }catch (error) {
                console.error("Fetch error:", error);
            }finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-[96.5%] h-120 mx-auto p-8 rounded-[0.625rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)]">
            
            <h1 className="text-[1.7rem] font-bold mb-2">
                Your Latest Achievements
            </h1>

            <div className="text-[1.1rem] mb-7">
                A quick look at your most recent milestones. Explore your full collection to track all your growing skills.
            </div>

            <Link href='/collection' className="bg-[#5F28CD] py-[0.937rem] px-7.5 rounded-[0.625rem] text-[1.125rem] font-semibold inline-block text-white duration-300 ease hover:bg-[#4410ab]">
                See Your Collection
            </Link>

            <div className="mt-14 flex flex-col items-start justify-end relative w-full pt-10">
                {!user ? (
                    <div className="text-[1.5rem] mx-auto pb-2">Loading...</div>
                ) : user.badges && user.badges.length > 0 ? (
                    <div className="flex flex-nowrap justify-between mx-auto mb-[0.1rem] w-[96%]">
                        {[...user.badges]
                            .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
                            .slice(0, 7)
                            .map((badge: any) => (
                                <div 
                                    key={badge.badgeId}
                                    className="transition-all duration-300 ease-out hover:-translate-y-2 hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]"
                                >
                                    <Image 
                                        src={badge.imgUrl.startsWith('/') || badge.imgUrl.startsWith('http') ? badge.imgUrl : `/${badge.imgUrl}`} 
                                        alt={badge.badgeName} 
                                        width={120}
                                        height={120}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-[1.2rem] mx-auto pb-2">- You don't have a badge yet -</p>
                )}
                
                <div className="bg-[#4D256E] w-full h-3 rounded-[0.625rem] shadow-[0.312rem_0.187rem_0.312rem_0_rgba(0,0,0,0.4)]"></div>
            </div>
        </div>
    );
};