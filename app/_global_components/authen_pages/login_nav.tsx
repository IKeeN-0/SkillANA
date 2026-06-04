import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav className="w-full h-[10vh] flex items-center pl-[3.5%] pt-[1%]
                bg-[#140b2e] text-white"
            >
                
                <div className="flex items-center gap-[1em] h-full">
                    
                    <Link href="/" className="relative w-[7em] md:w-[10em] xl:w-[10em] h-full ">
                        <Image 
                            src="/SkillAna.png" 
                            alt="SkillANA Logo" 
                            fill
                            className="object-contain block w-full"
                            priority
                        />
                    </Link>
                    
                </div>
            </nav>
        </>
    );   
}