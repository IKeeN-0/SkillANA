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
        <div id="features" className='py-[5em] '>
            <div className="mx-auto flex h-fit w-[96%] flex-col items-center rounded-[0.625rem] bg-[#0e0314] py-[8em] text-center ">
                
                <h1 className="mb-4.5 mt-10 w-full max-w-150 text-[2.5em] font-bold">
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

                <div className="w-full max-w-6xl mt-25 mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                        <div className="md:col-span-1 relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#dfa8ff]/40 hover:bg-white/10 group">
                            <div className="relative z-10 h-full flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-1">Prove Your Skill</h3>
                                <p className="text-white/50 text-sm mb-6">Pass the quick test.</p>
                                
                                {/* กราฟิกจำลองหน้าทำควิซ */}
                                <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col relative">
                                    {/* ตัวนับเวลา */}
                                    <div className="self-end text-[#ff4d4d] font-mono text-sm font-bold flex items-center gap-1 mb-4 animate-pulse">
                                        <span className="w-2 h-2 rounded-full bg-[#ff4d4d]" /> 00:30
                                    </div>
                                    
                                    <p className="text-white text-sm font-medium mb-4">Q: What is React?</p>
                                    
                                    <div className="space-y-2 mt-auto">
                                        <div className="w-full py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70">A library for UI</div>
                                        <div className="w-full py-2 px-3 rounded-lg bg-[#5F28CD]/40 border border-[#dfa8ff]/50 text-xs text-white shadow-[0_0_10px_rgba(95,40,205,0.4)]">A framework</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#dfa8ff]/40 hover:bg-white/10 group flex flex-col">
                            {/* แสง Glow พื้นหลัง */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#5F28CD] blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
                            
                            {/* ส่วนหัวข้อความ */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Build Standout Resumes</h3>
                                <p className="text-[#dfa8ff] font-medium">Turn your earned badges into a professional profile.</p>
                            </div>
                            
                            {/* กราฟิกกระดาษ Resume สีขาว (ดึงชิดขอบล่าง) */}
                            <div className="relative z-10 mt-10 w-full max-w-lg mx-auto bg-white rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] p-6 pt-5 flex-1 flex flex-col items-center origin-bottom transform group-hover:scale-[1.05] transition-transform duration-500 ease-out border-t border-x border-gray-200/50">
                                
                                {/* ข้อความ Resume */}
                                <h4 className="text-gray-800 font-black text-xl uppercase tracking-[0.2em] mb-5">
                                    Resume
                                </h4>
                                
                                {/* เส้นจำลองข้อความในเรซูเม่ */}
                                <div className="w-full flex flex-col items-center gap-3 mb-8">
                                    <div className="w-3/4 h-2.5 bg-gray-200 rounded-full" />
                                    <div className="w-1/2 h-2.5 bg-gray-100 rounded-full" />
                                </div>

                                {/* เหรียญ Badge */}
                                <div className="flex gap-3">
                                    {BADGES.map((badgeSrc, idx) => (
                                        <div 
                                            key={idx} 
                                            className="relative flex items-center justify-center w-20 h-20 bg-white border border-gray-100 rounded-full shadow-sm transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_12px_rgba(223,168,255,0.8)] group-hover:-translate-y-1 group-hover:scale-110"
                                        >
                                            <Image 
                                                src={badgeSrc} 
                                                alt={`badge-${idx}`} 
                                                width={70} 
                                                height={70} 
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </div>

                        <div className="md:col-span-3 relative overflow-hidden rounded-3xl bg-linear-to-r from-[#5F28CD]/20 to-purple-900/20 border border-[#5F28CD]/30 p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-around gap-6">
                        
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-[#dfa8ff] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            59
                            </h2>
                            <p className="text-white/60 font-medium mt-1">Tech Skills Available</p>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-white/10" />

                        <div className="text-center">
                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-[#dfa8ff] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            5,000+
                            </h2>
                            <p className="text-white/60 font-medium mt-1">Badges Earned</p>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-white/10" />

                        <div className="text-center">
                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-[#dfa8ff] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            99%
                            </h2>
                            <p className="text-white/60 font-medium mt-1">Resume Success Rate</p>
                        </div>

                        </div>

                    </div>
                </div>
            </div>    
        </div>
        
    );
}