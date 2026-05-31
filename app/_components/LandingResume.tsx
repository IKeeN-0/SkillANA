import Image from 'next/image';

export function ResumeSection() {
    return (
        <div id="resume" className="bg-[#0e0314] w-[96.5%] h-330 my-10 mx-auto py-40 px-[16.5%] rounded-[0.625rem]">
            
            <h2 className="w-75 text-[2em] font-bold mb-4.5">
                Build your resume with ease
            </h2>

            <p className="w-105 text-[1.05em] mb-20">
                Select template, pick your earned badges and turn them into a professional resume in just a few clicks.
            </p>

            <div className="bg-[rgba(128,128,128,0.238)] rounded-[0.625rem] overflow-hidden shadow-lg relative ring-1 ring-slate-100">  
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