'use client'
import { Navbar } from "@/app/_global_components/navbar/navbar"
import Footer from "@/app/_global_components/footer/footer"
import Sidebar from "./sidebar/sidebar"
import Section from "./section/section"
import Bg from "@/app/_global_components/background"
import { useState, useEffect, useMemo } from "react"
import { jwtDecode } from "jwt-decode"
import { BadgeData } from "./section/section"
import { Category } from "./section/section"
import { User } from "./section/section"

export default function Main({ mode = "all" }: { mode?: "all" | "collections" }) {
    const [category, setCategory] = useState<string>('all');
    const [badges, setBadges] = useState<BadgeData[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    
   useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.replace('/login');
                return;
            }

            const decodeToken = jwtDecode(token) as any;
           
            const userId = decodeToken.id || decodeToken.sub || decodeToken._id;

            if (!userId) {
                console.error("No User ID found in token");
                setLoading(false);
                return;
            }

            const [badgeRes, userRes] = await Promise.all([
                fetch('/api/badges', { headers: { "Authorization": `Bearer ${token}` } }),
                fetch(`/api/users/${userId}`, { headers: { "Authorization": `Bearer ${token}` } })
            ]);

            const badgeData = await badgeRes.json();
            const userData = await userRes.json();

            const badgeInfo = Array.isArray(badgeData) ? badgeData : badgeData.data || [];
            const userInfo = userData.user || userData.data || userData;
            
            setUser(userInfo);
        
            setBadges(badgeInfo);

            const uniqueCategories = Array.from(
                new Map(
                    badgeInfo
                    .filter((b: any) => b?.category?.categoryId)
                    .map((b: any) => [
                        b.category.categoryId.toString(),
                        {
                            ...b.category,
                            categoryId: b.category.categoryId.toString()
                        }
                    ])
                ).values()
            ) as Category[];
            
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
}, []);

const filteredBadges = badges;

    if (loading) return <div></div>;
    return (
        // 🚨 1. เปลี่ยนจาก min-h-screen เป็น h-screen และเพิ่ม flex flex-col 
        // เพื่อให้ Navbar อยู่บนสุด Footer อยู่ล่างสุด และบังคับไม่ให้ทั้งหน้าเลื่อนได้ (overflow-hidden)
        <div className="relative w-full h-screen text-white flex flex-col overflow-hidden"> 

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <nav>
                <Navbar />
            </nav>

            {/* 🚨 2. เปลี่ยนเป็น flex-1 เพื่อให้กินพื้นที่ตรงกลางทั้งหมด และใช้ overflow-hidden ป้องกันหน้าหลักเกิด Scroll */}
            <main className="flex flex-row flex-1 overflow-hidden">
                
                {/* 🚨 3. กำหนดความสูง h-full ให้ Sidebar (ถ้าข้อมูล Sidebar ยาว ก็สามารถใส่ overflow-y-auto เพิ่มตรงนี้ได้) */}
                <aside className="shrink-0 h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <Sidebar
                        onSelect={setCategory}
                        categories={categories}  
                    />
                </aside>

                {/* 🚨 4. Section ใช้ h-full และ overflow-y-auto เพื่อให้ Scroll เกิดขึ้นแค่เฉพาะในกล่องนี้ */}
                <section id="scrollable-section" className="flex-1 p-[2rem] h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
                    <Section
                        category={category}
                        badges={filteredBadges}
                        user={user}  
                        mode={mode}       
                    />
                </section>
            </main>

            {/* 🚨 5. Footer จะถูกดันมาอยู่ด้านล่างสุดเสมอจากผลของ flex-1 ใน <main> */}
            <footer className="shrink-0">
                <Footer />
            </footer>
        </div>
    );
}