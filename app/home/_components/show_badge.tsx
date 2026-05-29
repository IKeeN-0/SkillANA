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
        <div className="w-[96.5%] h-200 my-10 mx-auto py-32.5 px-[16.5%] rounded-[0.625rem]">
            
            <h1 className="w-87.5 text-[1.875rem] mb-4.5">
                Your achievements, all in one place
            </h1>

            <div className="w-105 text-[1.125rem] mb-7.5">
                See all the badges you’ve earned and keep track of your growing skill set.
            </div>

            <Link href='' className="bg-[#5F28CD] py-[0.937rem] px-7.5 rounded-[0.625rem] text-[1.125rem] font-bold inline-block text-white">
                See My Badges
            </Link>

            <div className="flex flex-col items-start justify-end min-h-55 relative mt-8">
                {!user ? (
                    <div className="text-[1.5rem] mx-auto">Loading...</div>
                ) : user.badges && user.badges.length > 0 ? (
                    <div className="flex flex-nowrap justify-start gap-[0.927rem] mx-auto mb-[0.1rem] w-[96%]">
                        {[...user.badges]
                            .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
                            .slice(0, 7)
                            .map((badge: any) => (
                                <div key={badge.badgeId}>
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
                    <p className="text-[1.2rem] mx-auto">- You don't have a badge yet -</p>
                )}
                
                <div className="bg-[#4D256E] w-full h-3 rounded-[0.625rem] shadow-[0.312rem_0.187rem_0.312rem_0_rgba(0,0,0,0.4)]"></div>
            </div>
        </div>
    );
};