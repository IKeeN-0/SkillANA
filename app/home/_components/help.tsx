import Link from 'next/link';

export function Help() {
  return (
    <div className="flex p-32.5 w-[96.5%] h-137.5 mx-auto my-10 justify-center items-center">
        
        <div className="m-[2.187rem_17%_0_0]">
            <h1 className="w-87.5 text-[1.875rem] mb-4.5">
                Stuck on something?
            </h1>
            
            <div className="w-125 text-[1.125rem] mb-10">
                We’ve got your back! Whether you’re stuck on a test or just getting started, our guide has all the answers.
            </div>
            <Link 
                href='' 
                className="bg-[#5F28CD] py-[0.937rem] px-10 rounded-[0.625rem] text-[1.125rem] font-bold transition-all duration-300 ease hover:bg-[#4410ab] inline-block text-white"
            >
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
            className="h-62.5 w-auto text-white drop-shadow-lg"
        >
            <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path d="M15 8h-5" />
            <path d="M15 12h-5" />
        </svg>
        
    </div>
  );
};