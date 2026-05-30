"use client";

import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const baseCategories = [
  { name: "Website Development", earned: 0, total: 0, color: "bg-[#ec4899]" },
  { name: "Programming Language", earned: 0, total: 0, color: "bg-[#3b82f6]" },
  { name: "Data Science", earned: 0, total: 0, color: "bg-[#a855f7]" },
  { name: "Database", earned: 0, total: 0, color: "bg-[#10b981]" },
  { name: "Cloud & DevOps", earned: 0, total: 0, color: "bg-[#f97316]" },
];

export function ProgressStats() {
  
  const [stats, setStats] = useState({ badgesEarned: 0 });
  const [categoryProgress, setCategoryProgress] = useState(baseCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token) as { id: string };
        const userId = decoded.id;

        const [userRes, badgesRes] = await Promise.all([
            fetch(`/api/users/${userId}`, {
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            }),
            fetch(`/api/badges`)
        ]);

        if (userRes.ok && badgesRes.ok) {
            const userData = await userRes.json();
            const allBadgesData = await badgesRes.json();

            // จำนวนเหรียญรวม
            setStats({ badgesEarned: userData.badges?.length || 0 });

            const updatedCategories = baseCategories.map(cat => ({ ...cat }));

            // จำนวนเหรียญในแต่ละหมวด
            allBadgesData.forEach((badge: any) => {
                const catName = badge.category?.name?.trim();
                const targetCat = updatedCategories.find(c => c.name === catName);
                if (targetCat) {
                    targetCat.total += 1;
                }
            });

            // นับจำนวนเหรียญที่ได้รับ
            if (userData.badges) {
                userData.badges.forEach((userBadge: any) => {
                    // ดูว่าเหรียญอยู่หมวดไหน
                    const masterBadge = allBadgesData.find((b: any) => b.badgeName === userBadge.badgeName);
                    if (masterBadge) {
                        const catName = masterBadge.category?.name?.trim();
                        const targetCat = updatedCategories.find(c => c.name === catName);
                        if (targetCat) {
                            targetCat.earned += 1;
                        }
                    }
                });
            }

            setCategoryProgress(updatedCategories);
        }
      } catch (error) {
        console.error("Error fetching progress stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="h-full mx-auto p-8 rounded-[0.625rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 flex flex-col">
      
      <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Your Stats</h2>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#dfa8ff]/40 transition-all duration-300 w-full mb-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#dfa8ff] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
          <div className="relative z-10 text-5xl font-black text-white drop-shadow-lg">
            {loading ? "..." : stats.badgesEarned}
          </div>
          <div className="relative z-10 text-white/70 mt-2 font-medium tracking-wider uppercase text-sm">
            Total Badges Earned
          </div>
        </div>

      {/* หลอดความคืบหน้าของแต่ละหมวด */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex-1 group hover:border-[#dfa8ff]/40 transition-all duration-300">
        <h3 className="text-[1.1rem] font-bold text-white mb-6">Badge Collection Progress</h3>
        
        {loading ? (
            <div className="text-white/60 text-center py-4">Loading stats...</div>
        ) : (
            <div className="flex flex-col gap-5">
            {categoryProgress.map((cat) => {
                // คำนวณเปอร์เซ็นต์ ถ้าไม่มีเหรียญเลยให้เป็น 0
                const percentage = cat.total > 0 ? Math.round((cat.earned / cat.total) * 100) : 0;

                return (
                <div key={cat.name} className="w-full">
                    <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/90 text-[1em] font-semibold">{cat.name}</span>
                    <span className="text-white/50 text-sm font-medium">
                        {cat.earned} / {cat.total}
                    </span>
                    </div>
                    
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                    />
                    </div>
                </div>
                )
            })}
            </div>
        )}
      </div>

    </div>
  )
}