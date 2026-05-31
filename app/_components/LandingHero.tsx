import Link from 'next/link';
import Image from 'next/image';

const BADGES = [
    "/badges/web_badge/html.png",
    "/badges/prolang_badge/python.png",
    "/badges/datasci_badge/pyTorch.png", 
    "/badges/database_badge/sql.png",
    "/badges/devops_badge/docker.png"
];

export function Hero_section() {
    return (
        <div id="features" className='py-[4em] md:py-[5em]'>
            <div className="mx-auto flex h-fit w-[96%] flex-col items-center rounded-[0.625rem] bg-[#0e0314] py-[5em] md:py-[8em] text-center px-4">
                
                {/* ปรับลดขนาดฟอนต์หัวข้อหลักบนจอโทรศัพท์เป็น text-[1.8em] และขยายเป็น text-[2.5em] บนจอคอมพิวเตอร์ */}
                <h1 className="mb-4.5 mt-5 md:mt-10 w-full max-w-150 text-[1.8em] sm:text-[2.2em] md:text-[2.5em] font-bold leading-tight">
                    Explore skills. Earn badges. Show your mastery.
                </h1>

                {/* ปรับลดขนาดฟอนต์คำอธิบายบนจอโทรศัพท์เป็น text-[0.95rem] */}
                <p className="mb-7.5 mt-0 w-full max-w-127.5 text-[0.95rem] md:text-[1.12em] text-white/80">
                    Browse interesting skills, pass a quick test, and get a verified badge to prove your expertise.
                </p>

                <Link 
                    href="/create-account" 
                    className="inline-block rounded-[0.625rem] bg-[#5F28CD] px-8 py-3.5 md:px-11 md:py-4 text-[1rem] md:text-[1.12rem] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c]"
                >
                    Start now →
                </Link>

                <div className="w-full max-w-6xl mt-16 md:mt-25 mx-auto px-2 md:px-6 py-6 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                        
                        <div className="md:col-span-1 relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#dfa8ff]/40 hover:bg-white/10 group">
                            <div className="relative z-10 h-full flex flex-col">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 text-left">Prove Your Skill</h3>
                                <p className="text-white/50 text-xs md:text-sm mb-6 text-left">Pass the quick test.</p>
                                
                                <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col relative">
                                    <div className="self-end text-[#ff4d4d] font-mono text-xs md:text-sm font-bold flex items-center gap-1 mb-4 animate-pulse">
                                        <span className="w-2 h-2 rounded-full bg-[#ff4d4d]" /> 00:30
                                    </div>
                                    <p className="text-white text-xs md:text-sm font-medium mb-4 text-left">Q: What is React?</p>
                                    <div className="space-y-2 mt-auto text-left">
                                        <div className="w-full py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-[11px] md:text-xs text-white/70">A library for UI</div>
                                        <div className="w-full py-2 px-3 rounded-lg bg-[#5F28CD]/40 border border-[#dfa8ff]/50 text-[11px] md:text-xs text-white shadow-[0_0_10px_rgba(95,40,205,0.4)]">A framework</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#dfa8ff]/40 hover:bg-white/10 group flex flex-col">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#5F28CD] blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
                            <div className="relative z-10 text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Build Standout Resumes</h3>
                                <p className="text-[#dfa8ff] text-sm md:text-base font-medium">Turn your earned badges into a professional profile.</p>
                            </div>
                            
                            <div className="relative z-10 mt-8 w-full max-w-lg mx-auto bg-white rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-4 md:p-6 pt-5 flex-1 flex flex-col items-center origin-bottom transform group-hover:scale-[1.03] transition-transform duration-500 ease-out border-t border-x border-gray-200/50">
                                <h4 className="text-gray-800 font-black text-sm md:text-xl uppercase tracking-[0.2em] mb-4">Resume</h4>
                                <div className="w-full flex flex-col items-center gap-2 mb-6">
                                    <div className="w-3/4 h-2 bg-gray-200 rounded-full" />
                                    <div className="w-1/2 h-2 bg-gray-100 rounded-full" />
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                                    {BADGES.map((badgeSrc, idx) => (
                                        <div 
                                            key={idx} 
                                            className="relative flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-white border border-gray-100 rounded-full shadow-sm"
                                        >
                                            <Image 
                                                src={badgeSrc} 
                                                alt={`badge-${idx}`} 
                                                width={50} 
                                                height={50} 
                                                className="object-contain p-1 md:p-0"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3 relative overflow-hidden rounded-3xl bg-linear-to-r from-[#5F28CD]/20 to-purple-900/20 border border-[#5F28CD]/30 p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-around gap-6">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-[#dfa8ff]">59</h2>
                                <p className="text-white/60 text-xs md:text-sm font-medium mt-1">Tech Skills Available</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-[#dfa8ff]">5,000+</h2>
                                <p className="text-white/60 text-xs md:text-sm font-medium mt-1">Badges Earned</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-[#dfa8ff]">99%</h2>
                                <p className="text-white/60 text-xs md:text-sm font-medium mt-1">Resume Success Rate</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>    
        </div>
    );
}