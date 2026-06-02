import Link from 'next/link';

export function Help() {
  return (
    <div className="flex w-full h-auto lg:h-48 xl:h-fit mx-auto p-4 pb-5 md:p-8 rounded-[0.625rem] justify-between items-center bg-white/10 backdrop-blur-xl border border-white/20 transition-all">
        <div className="max-w-[70%] md:max-w-[60%]">
            <h1 className="text-lg md:text-xl xl:text-[1.7em] font-semibold mb-1 xl:mb-2">
                Stuck on something?
            </h1>
            
            <div className="text-xs md:text-sm xl:text-[1.1rem] mb-4 xl:mb-7 opacity-80 leading-relaxed">
                Need a hand? Our comprehensive guide is here to help.
            </div>

            <Link href='/SkillANA-User-Handbook.pdf' 
                className="bg-[#5F28CD] py-2 px-4 text-sm md:py-2.5 md:px-5 md:text-base xl:py-[0.937rem] xl:px-7.5 xl:text-[1.125rem] rounded-[0.625rem] font-semibold inline-block text-white duration-300 ease hover:bg-[#4410ab]"
            download>
                Start Guide
            </Link>
        </div>
        
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            className="h-20 md:h-32 lg:h-24 xl:h-47 w-auto text-white xl:text-white"
        >
            <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path d="M15 8h-5" />
            <path d="M15 12h-5" />
        </svg>
    </div>
  );
}