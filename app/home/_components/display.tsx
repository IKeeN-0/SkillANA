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

    return(
        <div className='mb-6'>
            <h1 className="pt-8 px-[1%] font-bold text-3xl ">
                Hello, {firstName}
            </h1>
            <p className="mt-2 px-[1%] text-[1em] ">
                Here is a quick overview of your recent progress.
            </p>
        </div>
        
    );
}