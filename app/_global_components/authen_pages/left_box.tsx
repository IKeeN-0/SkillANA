import Image from "next/image";

export default function LeftBox() {
    return (
        <>
            <section className="flex flex-col pl-[5%] w-[45%] h-full">
                <div className="relative w-[72%] h-[55%] mt-[5em] ">
                    <Image 
                        src="/login-logo2-final.png" 
                        alt="SkillANA Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                
                <div className="ml-[50px]">
                    <h2 className="text-[1.5em] font-bold ">
                        Learn and grow <br />
                        your skills with SkillANA
                    </h2>
                    <p className="mt-[1.25em] text-[1em] font-[100] text-gray-400">
                        Collecting your skill with skill wallet website
                    </p>
                </div>
            </section>
        </>
    );
}