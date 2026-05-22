import Image from 'next/image';

export function ResumeSection() {
    return (
        <div id="resume" className="bg-[#0e0314] w-[96.5%] h-387.5 my-10 mx-auto py-32.5 px-[16.5%] rounded-[0.625rem]">
            
            <h2 className="w-75 text-[2em] font-bold mb-4.5">
                Build your resume with ease
            </h2>

            <p className="w-105 text-[1.05em] mb-20">
                Select template, pick your earned badges and turn them into a professional resume in just a few clicks.
            </p>

            <div className="bg-[rgba(128,128,128,0.238)] border border-solid border-white rounded-[0.625rem] h-250">  
                {/*ไว้ใส่อนิเม*/}
            </div> 
        </div>
    );
};