export function ResumeSection() {
    return (
        <div id="resume" className="bg-[#0e0314] w-[96.5%] h-auto my-10 mx-auto py-12 px-4 md:py-40 md:px-[16.5%] rounded-[0.625rem]">
            
            {/* ปรับฟอนต์หัวข้อเป็น text-[1.5em] บนมือถือ */}
            <h2 className="w-full md:w-75 text-[1.5em] md:text-[2em] font-bold mb-4.5">
                Build your resume with ease
            </h2>

            {/* ปรับฟอนต์คำอธิบายเป็น text-[0.95rem] บนมือถือ */}
            <p className="w-full md:w-105 text-[0.95rem] md:text-[1.05em] mb-8 md:mb-20 text-white/80">
                Select template, pick your earned badges and turn them into a professional resume in just a few clicks.
            </p>

            <div className="bg-[rgba(128,128,128,0.238)] rounded-[0.625rem] overflow-hidden shadow-lg relative ring-1 ring-slate-100 w-full">  
                <video 
                    src="/videos/resume.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain" 
                />
            </div> 
        </div>
    );
};