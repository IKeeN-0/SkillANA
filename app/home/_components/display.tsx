"use client";

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function HomeNameDisplay() {
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            
            const decoded = jwtDecode(token) as { id: string };
            try {
                const res = await fetch(`/api/users/${decoded.id}`);
                const data = await res.json();
                setFirstName(data.firstName);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className='mb-4 lg:mb-5 lg:mt-3 xl:mb-6'>
            <h1 className="pt-4 lg:pt-2 xl:pt-8 font-bold text-xl md:text-2xl xl:text-3xl">
                Hello, {firstName}
            </h1>
            <p className="mt-1 lg:mt-0 xl:mt-2  text-sm md:text-base xl:text-[1em] opacity-80">
                Here is a quick overview of your recent progress.
            </p>
        </div>
    );
}