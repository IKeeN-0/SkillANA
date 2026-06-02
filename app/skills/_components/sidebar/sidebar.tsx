'use client'

import { useEffect } from 'react'
import { Category } from '../section/section'
import { categoryOrderMap } from '../section/section'

type Prop = {
    onSelect: (category: string) => void;
    categories: Category[];
    activeCategory: string; 
}

const getCategoryIcon = (name: string) => {
    const cleanName = name.trim().toLowerCase();
    
    const iconClass = "w-[1.35em] h-[1.35em] transition-all duration-300";

    switch (cleanName) {
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

export default function Sidebar({ onSelect, categories, activeCategory }: Prop) {

    useEffect(() => {
        if (categories && categories.length > 0 && !activeCategory) {
            const sortedCategories = [...categories].sort((a,b) => (categoryOrderMap[a.name] ?? 999) - (categoryOrderMap[b.name] ?? 999));
            const firstCategory = sortedCategories[0];
            onSelect(firstCategory.categoryId);
        }
    }, [categories, activeCategory, onSelect]);

    const handler = (categoryId: string) => {
        onSelect(categoryId); 
        
        const targetElement = document.getElementById(`category-${categoryId}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ลด md:pr-[2rem] เป็น md:pr-[1rem] เพื่อให้ข้อความมีพื้นที่เยอะขึ้น
    const liBaseClass = "py-2 px-4 md:py-[1.4em] md:pl-[1.8rem] md:pr-[1rem] my-1 md:my-2 flex-shrink-0 flex items-center gap-2 md:gap-[1rem] cursor-pointer transition-all duration-300 md:border-l-4 rounded-full md:rounded-none md:rounded-r-[8px]";

    const getStatusClass = (isActive: boolean) => {
        return isActive
            ? "bg-[#5F28CD] md:border-[#9d6fff] text-white md:scale-[0.97]"
            : "bg-white/5 md:bg-transparent border-transparent text-gray-300 hover:bg-[#5F28CD]/40 hover:md:border-[#5F28CD] hover:md:scale-[0.98] hover:text-white"; 
    }

    return (
        <div className="w-full md:w-[18em] h-auto md:h-full bg-[#23103d] flex items-center md:items-start text-white md:border-r border-[#ffffff1a]">
            
            <div className="flex flex-col md:mt-[15%] text-[1em] w-full px-2 py-3 md:py-0">

                <h2 className='hidden md:block text-[1.2em] font-semibold tracking-wide pl-6 mb-[1.5em] text-gray-400 uppercase text-xs'>Category</h2>
                
                <ul className="list-none w-full h-full p-0 m-0 flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto md:overflow-visible scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 md:px-0">
                    {[...categories]
                    .sort((a,b) => (categoryOrderMap[a.name] ?? 999) - (categoryOrderMap[b.name] ?? 999))
                    .map((cate) => {
                        const isActive = activeCategory === cate.categoryId;
                        return (
                            <li  
                                key={cate.categoryId} 
                                className={`${liBaseClass} ${getStatusClass(isActive)}`}
                                onClick={() => handler(cate.categoryId)}
                            >
                                <span className="scale-75 md:scale-100 shrink-0">{getCategoryIcon(cate.name)}</span>
                                {/* เปลี่ยนจาก whitespace-nowrap ตลอดกาล เป็นยอมให้ปัดบรรทัดได้บนจอคอม (md:whitespace-normal md:leading-tight) */}
                                <span className="font-medium text-sm md:text-base whitespace-nowrap md:whitespace-normal md:leading-tight">{cate.name}</span>
                            </li>
                        );
                    })
                    }
                </ul>
            </div>
        </div>
    )
}