import styles from '@/app/_components/LandingNavbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export function LandingPageNavbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-1000 w-full ">
            <nav className="flex h-15 w-full items-center justify-between bg-[#1b103d] text-[1rem] text-white px-8 md:px-8">
                
                <Link href="/" className="relative w-[10em] h-full ">
                    <Image 
                        src="/SkillAna.png" 
                        alt="SkillANA Logo" 
                        fill
                        className="object-contain block w-full"
                        priority
                    />
                </Link>

                <ul className="hidden md:flex flex-1 items-center justify-center gap-15 list-none p-0 m-0">
                    <li className={styles.menu_item}>
                        <Link href="#features" className="h-full flex items-center justify-center w-full font-bold">Features</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link href="#badges" className="h-full flex items-center justify-center w-full font-bold">Badges</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link href="#resume" className="h-full flex items-center justify-center w-full font-bold">Resume</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link href="#" className="h-full flex items-center justify-center w-full font-bold">About Us</Link>
                    </li>
                </ul>

                <ul className="flex shrink-0 items-center gap-8 whitespace-nowrap list-none p-0 m-0">
                    <li>
                        <Link href="/create-account" className="font-bold hover:text-gray-300 transition-all duration-300 ease-in-out">
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/login" 
                            className="cursor-pointer rounded-[0.625rem] bg-[#5F28CD] px-7 py-3 font-bold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c] inline-block"
                        >
                            Login
                        </Link>
                    </li>
                </ul>

            </nav>
        </div>
    );
}