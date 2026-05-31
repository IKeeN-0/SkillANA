import Image from "next/image";

export default function LeftBox() {
    return (
        <>
            <section className="flex flex-col pl-[4%] w-[45%] mt-[7%]">
                
                <div className="relative w-[72%] aspect-4/3">
                    <Image 
                        src="/login-logo2-final.png" 
                        alt="SkillANA Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                
                <div className="ml-17.5 mt-4">
                    <h2 className="text-[1.5em] font-bold ">
                        Learn and grow <br />
                        your skills with SkillANA
                    </h2>
                    <p className="mt-[1.25em] text-[1em] font-thin text-gray-400">
                        Collecting your skill with skill wallet website
                    </p>
                </div>
            </section>
        </>
    );
}