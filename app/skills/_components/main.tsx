'use client'
import { Navbar } from "@/app/_global_components/navbar/navbar"
import Footer from "@/app/_global_components/footer/footer"
import Sidebar from "./sidebar/sidebar"
import Section from "./section/section"
import Bg from "@/app/_global_components/background/pageBackground"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { BadgeData } from "./section/section"
import { Category } from "./section/section"
import { User } from "./section/section"

function SectionSkeleton() {
    return (
        <div className="w-full animate-pulse flex flex-col gap-8">
            {[1, 2].map((i) => (
                <div key={i} className="w-full">
                    <div className="h-8 bg-white/20 rounded w-48 mb-4"></div>
                    <div className="px-4 py-8 rounded-4xl bg-white/5 border border-white/10 min-h-50">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-6 gap-y-10 justify-items-center">
                            {[1, 2, 3, 4, 5].map((j) => (
                                <div key={j} className="flex flex-col items-center gap-3 w-full">
                                    <div className="w-[6em] h-[6em] rounded-full bg-white/10"></div>
                                    <div className="h-4 bg-white/10 rounded w-20"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Main({ mode = "all" }: { mode?: "all" | "collections" }) {
    const [category, setCategory] = useState<string>(''); 
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

    return (
        <div className="relative w-full h-screen text-white flex flex-col overflow-hidden"> 

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <nav>
                <Navbar />
            </nav>

            <main className="flex flex-col md:flex-row flex-1 overflow-hidden">
                
                {/* เพิ่ม md:w-auto เพื่อป้องกันไม่ให้ Sidebar กินพื้นที่กว้างเต็มจอบนคอม */}
                <aside className="shrink-0 w-full md:w-auto h-auto md:h-full md:overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-b border-white/10 md:border-b-0">
                    <Sidebar
                        onSelect={setCategory}
                        categories={categories}
                        activeCategory={category}  
                    />
                </aside>

                {/* เพิ่ม w-full min-h-0 min-w-0 เพื่อแก้บั๊กกล่องบีบตัวจนความสูงเหลือ 0 บนมือถือ */}
                <section id="scrollable-section" className="flex-1 w-full min-h-0 min-w-0 p-4 md:p-8 h-full overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]: scroll-smooth">
 
                    {loading ? (
                        <SectionSkeleton />
                    ) : (
                        <Section
                            category={category}
                            badges={filteredBadges}
                            user={user}  
                            mode={mode} 
                            onVisible={setCategory}      
                        />
                    )}
                </section>
            </main>

            <footer className="shrink-0">
                <Footer />
            </footer>
        </div>
    );
}