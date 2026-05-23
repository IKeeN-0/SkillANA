'use client'

import { useState } from 'react'
import { Category } from '../section/section'
import { categoryOrderMap } from '../section/section'

type Prop = {
    onSelect: (category: string) => void;
    categories: Category[];
}

const getCategoryIcon = (name: string) => {
    const cleanName = name.trim().toLowerCase();
    
    const iconClass = "w-[1.35em] h-[1.35em] transition-all duration-300";

    switch (cleanName) {
        case 'all':
            return (
                <svg 
                    className="w-5 h-5 shrink-0 transition-all duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V16zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V16z" />
                </svg>
            );
        case 'website development':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            );
        case 'programming language':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        case 'data science':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            );
        case 'database':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            );
        case 'cloud & devops':
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            );
        default:
            return (
                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
            );
    }
};

export default function Sidebar({ onSelect, categories }: Prop) {
    const [select, setSelect] = useState<string>("all");

    const handler = (categoryId: string) => {
        setSelect(categoryId);
        onSelect(categoryId);
    }

    const liBaseClass = "py-[1.4em] pl-[1.8rem] pr-[2rem] my-2 flex items-center gap-[1rem] cursor-pointer transition-all duration-300 border-l-4 rounded-r-[8px]";

    const getStatusClass = (isActive: boolean) => {
        return isActive
            ? "bg-[#5F28CD] border-[#9d6fff] text-white scale-[0.97]"
            : "bg-transparent border-transparent text-gray-300 hover:bg-[#5F28CD]/40 hover:border-[#5F28CD] hover:scale-[0.98] hover:text-white"; 
    }

    return (
        <div className="w-[16em] h-screen bg-[#23103d] flex items-start text-white border-r border-[#ffffff1a]">
            
            <div className="flex flex-col mt-[15%] text-[1em] w-full px-2">

                <h2 className='text-[1.2em] font-semibold tracking-wide pl-6 mb-[1.5em] text-gray-400 uppercase text-xs'>Category</h2>
                
                <ul className="list-none w-full h-full p-0 m-0 flex flex-col gap-1">
                    
                    {/* เมนูหลัก */}
                    <li
                        className={`${liBaseClass} ${getStatusClass(select === 'all')}`}
                        onClick={() => handler('all')}
                    >
                        {getCategoryIcon('all')}
                        <span className="font-medium">All Skills</span>
                    </li>

                    {[...categories]
                    .sort((a,b) => (categoryOrderMap[a.name] ?? 999) - (categoryOrderMap[b.name] ?? 999))
                    .map((cate) => {
                        const isActive = select === cate.categoryId;
                        return (
                            <li  
                                key={cate.categoryId} 
                                className={`${liBaseClass} ${getStatusClass(isActive)}`}
                                onClick={() => handler(cate.categoryId)}
                            >
                                {getCategoryIcon(cate.name)}
                                <span className="font-medium">{cate.name}</span>
                            </li>
                        );
                    })
                    }
                </ul>
            </div>
        </div>
    )
}