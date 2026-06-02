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
    <div className="h-full w-full mx-auto p-4 xl:p-8 rounded-[0.625rem] bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col">
      <h2 className="text-xl xl:text-2xl font-bold text-white mb-4 xl:mb-6">Your Stats</h2>

      <div className="flex flex-col md:flex-row xl:flex-col gap-4 xl:gap-6 flex-1">
        
        {/* Total Badges (กล่องบน) */}
        {/* เพิ่ม xl:flex-none เพื่อไม่ให้มันยืดตัวในแนวตั้ง และเพิ่ม xl:py-6 เพื่อคุมระยะด้านบนล่างให้สวยงาม */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6 flex flex-col justify-center items-center flex-1 md:max-w-[30%] xl:max-w-full xl:flex-none xl:py-6">
          <div className="text-3xl xl:text-5xl font-black text-white">
            {loading ? "..." : stats.badgesEarned}
          </div>
          <div className="text-white/70 mt-1 text-[10px] xl:text-sm uppercase text-center">
            Total Badges Earned
          </div>
        </div>

        {/* Progress Bars (กล่องล่าง) */}
        {/* มี flex-1 อยู่แล้ว มันจะยืดตัวเพื่อกินพื้นที่ที่เหลือทั้งหมดบนจอโน้ตบุ๊กโดยอัตโนมัติ */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6 flex-1">
          <h3 className="text-sm xl:text-[1.1rem] font-bold text-white mb-4">Badge Collection Progress</h3>
          <div className="flex flex-col gap-3 lg:gap-2 xl:gap-5">
            {categoryProgress.map((cat) => (
              <div key={cat.name} className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/90 text-[10px] md:text-xs xl:text-[1em] font-semibold">{cat.name}</span>
                  <span className="text-white/50 text-[12px]">{cat.earned}/{cat.total}</span>
                </div>
                <div className="w-full h-1.5 xl:h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.total > 0 ? (cat.earned/cat.total)*100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}