"use client";

import styles from './show_badge.module.css';
import Link from 'next/link';
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
        <div className={styles.badgeSection}>
            <h1 className={styles.mainText}>
                Your achievements, all in one place
            </h1>

            <div className={styles.subText}>
                See all the badges you’ve earned and keep track of your growing skill set.
            </div>

            <Link href='' className={styles.btn}>See My Badges</Link>

            <div className={styles.collection}>
                {!user ? (
                    <div className={styles.loader}>Loading...</div>
                ) : user.badges && user.badges.length > 0 ? (
                    <div className={styles.badgeList}>
                        {[...user.badges]
                            .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
                            .slice(0, 7)
                            .map((badge: any) => (
                                <div key={badge.badgeId} className={styles.badgeItem}>
                                <img 
                                    src={badge.imgUrl} 
                                    alt={badge.badgeName} 
                                    width={120}
                                    height={120}
                                />
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className={styles.none}>- You don't have a badge yet -</p>
                )}
                
                <div className={styles.base}></div>
            </div>
        </div>
    );
};