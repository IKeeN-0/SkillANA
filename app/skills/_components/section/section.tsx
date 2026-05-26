'use client'

import { useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from "next/link";

export interface Category {
    categoryId: string;
    name: string;
}

export interface BadgeData {
    _id: string;
    badgeName: string;
    imgUrl: string;
    category: Category;
}

export interface UserBadge {
    badgeId: string;
    badgeName: string;
    imgUrl: string;
    earnedAt: string;
}

export interface User {
    _id?: string;
    badges: UserBadge[];
}

type Prop = {
    category: string;
    badges: BadgeData[];
    user: User | null;
    mode: "all" | "collections"; 
}

type BadgeOwned = BadgeData & { owned: boolean }

type GroupedBadges = Record<
    string,
    {
        categoryName: string;
        order: number;
        badge: BadgeOwned[];
    }
>;

export const categoryOrderMap: Record<string, number> = {
    "Website Development": 1,
    "Programming Language": 2,
    "Data Science": 3,
    "Database": 4,
    "Cloud & DevOps": 5
};

export default function Section({ category, badges, user, mode }: Prop) {

    const group = useMemo(() => {
        if (!user) return {};

        const userBadgeSet = new Set(
            user.badges.map(b => b.badgeId)
        );

        const mergeBadge: BadgeOwned[] = badges.map((badge) => ({
            ...badge,
            owned: userBadgeSet.has(badge._id)
        }));

        return mergeBadge.reduce((acc, badge) => {
            if (!badge.category) return acc;

            const id = badge.category.categoryId.toString();
            const name = badge.category.name;
            const normalized = name.trim();

            if (!acc[id]) {
                acc[id] = {
                    categoryName: name,
                    order: categoryOrderMap[normalized] ?? 999,
                    badge: []
                };
            }

            acc[id].badge.push(badge);
            return acc;
        }, {} as GroupedBadges);

    }, [badges, user]);

    const sortedGroups = useMemo(() => {
        return Object.entries(group).sort((a, b) => a[1].order - b[1].order);
    }, [group]);

    const firstCategoryId = sortedGroups[0]?.[0];

    const fromQuery = mode === "collections" ? "collections" : "skills";

    if (badges.length === 0 && Object.keys(group).length === 0) {
        return <div>No badges found.</div>;
    }

    useEffect(() => {
        const container = document.getElementById('scrollable-section');
        if (!container) return;

        if (category === 'all' || category === firstCategoryId) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const targetElement = document.getElementById(`category-${category}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [category, firstCategoryId]); // ทำงานเมื่อกดเปลี่ยน category

    if (badges.length === 0 && Object.keys(group).length === 0) {
        return <div>No badges found.</div>;
    }
   
    return (
        <>
            {sortedGroups.map(([id, groupItem]) => {
    
                    const displayBadges =
                        mode === "collections"
                            ? groupItem.badge.filter(b => b.owned)
                            : groupItem.badge;
    
                    return (
                        <div key={id} id={`category-${id}`} className="w-full scroll-mt-4">
                            <div className="flex justify-between items-center mb-[0.7rem]">
                                <h1 className="text-[1.7em] font-bold tracking-wide text-white">
                                    {groupItem.categoryName}
                                </h1>
                                
                                {mode === "collections" && (
                                    <span className="text-[1em] font-medium text-white/90 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                                        {displayBadges.length} / {groupItem.badge.length} Earned
                                    </span>
                                )}
                            </div>

                            <div className="relative px-4 py-5 rounded-4xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] mb-[2.2em] w-full transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)]">
    
                                    {mode === "collections" && displayBadges.length === 0 ? (
                                        <h2 className="w-full text-center p-10 text-white/70 flex items-center justify-center min-h-50">
                                            You don't have any badges in this category yet
                                        </h2>
                                    ) : (
                                        <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-6 gap-y-10 justify-center justify-items-center">
                                            {displayBadges.map((b) => (
                                                <div
                                                    key={b._id}
                                                    className="group relative cursor-pointer text-center flex flex-col items-center w-full transition-all duration-300"
                                                >
                                                    <div className="relative w-[6em] h-[6em] mb-[0.7em] z-10 transition-transform duration-300 group-hover:scale-105">
                                                        <Link href={`/badge/${b._id}?from=${fromQuery}`}>
                                                            
                                                            <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-500 ${
                                                                b.owned 
                                                                ? "drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" // ถ้ามีแล้ว: เรืองแสงสีเขียวอ่อนๆ
                                                                : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100" // ถ้ายังไม่มี: ขาวดำและจางลง (แต่พอเอาเมาส์ชี้จะสว่างขึ้นมา)
                                                            }`}>
                                                                <Image
                                                                    src={`/${b.imgUrl}`}
                                                                    alt={b.badgeName}
                                                                    width={100}
                                                                    height={100}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            
                                                            {b.owned && (
                                                                <Image
                                                                    src="/badgePass.png"
                                                                    alt="owned"
                                                                    width={35}
                                                                    height={35}
                                                                    className="absolute -top-1 -right-1 z-20 drop-shadow-md" 
                                                                />
                                                            )}
                                                        </Link>
                                                    </div>
    
                                                    <div className="flex flex-col items-center justify-center w-full mt-1">
                                                        <h3 className={`text-[14px] font-semibold transition-colors duration-300 leading-tight wrap-break-word max-w-full px-1 ${
                                                            b.owned ? "text-white" : "text-white/40 group-hover:text-white/90"
                                                        }`}>
                                                            {b.badgeName}
                                                        </h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    );
                })}
        </>
    );
}