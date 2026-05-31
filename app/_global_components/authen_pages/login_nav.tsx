import Image from "next/image";

export default function Navbar() {
    return (
        <>
            <nav className="w-full h-[10vh] flex items-center pl-[3.5%] pt-[1%]
                bg-[#140b2e] text-white"
            >
                
                <div className="flex items-center gap-[1em] h-full">
                    
                    <div className="relative w-[9em] h-[100%]">
                        <Image 
                            src="/SkillAna.png" 
                            alt="SkillANA Logo" 
                            fill
                            className="object-contain block w-full"
                            priority
                        />
                    </div>
                    
                </div>
            </nav>
        </>
    );   
}