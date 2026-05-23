import Link from 'next/link';

export function Hero_section() {
    return (
        <div id="features" className='py-[5em] '>
            <div className="mx-auto flex h-166 w-[96%] flex-col items-center rounded-[0.625rem] bg-[#0e0314] py-[8em] text-center ">
                
                <h1 className="mb-4.5 mt-0 w-full max-w-150 text-[2.5em] font-bold">
                    Explore skills. Earn badges. Show your mastery.
                </h1>

                <p className="mb-7.5 mt-0 w-full max-w-127.5 text-[1.12em]">
                    Browse interesting skills, pass a quick test, and get a verified badge to prove your expertise.
                </p>

                <Link 
                    href="/create-account" 
                    className="inline-block rounded-[0.625rem] bg-[#5F28CD] px-11 py-4 text-[1.12rem] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c]"
                >
                    Start now →
                </Link>
            </div>    
        </div>
        
    );
}