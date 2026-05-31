import Link from 'next/link';

export function Help() {
  return (
    <div className="flex w-[96.5%] h-fit mx-auto p-8 rounded-[0.625rem] justify-between bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)]">
        
        <div className="">
            <h1 className="w-87.5 text-[1.7em] font-semibold mb-2">
                Stuck on something?
            </h1>
            
            <div className="w-125 text-[1.1rem] mb-7">
                Need a hand? From getting started to passing your tests, our comprehensive guide is here to help.
            </div>

          
            <Link 
                href='/SkillANA-User-Handbook.pdf' 
                className="bg-[#5F28CD] py-[0.937rem] px-10 rounded-[0.625rem] text-[1.125rem] font-bold transition-all duration-300 ease hover:bg-[#4410ab] inline-block text-white"
            download>
                View Our Start Guide
            </Link>
        </div>
        
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-47 w-auto mr-10 text-white drop-shadow-lg"
        >
            <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path d="M15 8h-5" />
            <path d="M15 12h-5" />
        </svg>
        
    </div>
  );
};