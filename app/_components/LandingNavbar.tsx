import styles from '@/app/_components/LandingNavbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export function LandingPageNavbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-1000 w-full ">
            <nav className="flex h-15 w-full items-center justify-between bg-[#240f65] text-[1rem] text-white px-4 md:px-6 xl:px-8">
                
                {/* ขนาดกล่องโลโก้ปรับเปลี่ยนความกว้างแบบ Responsive ให้ยืดหยุ่นในแต่ละขนาดหน้าจอ */}
                <Link href="/" className="relative w-[7em] md:w-[10em] xl:w-[10em] h-full ">
                    <Image 
                        src="/SkillAna.png" 
                        alt="SkillANA Logo" 
                        fill
                        className="object-contain block w-full"
                        priority
                    />
                </Link>

                {/* เปลี่ยนคลาสเป็น hidden xl:flex เพื่อซ่อนเมนูตรงกลางบน Mobile, iPad และ Laptop ขนาดเล็ก */}
                {/* เมนูจะแสดงเฉพาะบนหน้าจอขนาดใหญ่กว้างระดับ xl (1280px) ขึ้นไปเท่านั้น */}
                <ul className="hidden xl:flex flex-1 items-center justify-center gap-6 xl:gap-15 list-none p-0 m-0">
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

                {/* ชุดปุ่มฝั่งขวา: ปรับลดช่องไฟเว้นระยะ (gap-) ให้มีความกระชับและสมดุลเหมาะสมกับสัดส่วนจอ */}
                <ul className="flex shrink-0 items-center gap-4 md:gap-6 xl:gap-8 whitespace-nowrap list-none p-0 m-0">
                    <li>
                        <Link href="/create-account" className="font-bold text-sm md:text-base hover:text-gray-300 transition-all duration-300 ease-in-out">
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/login" 
                            className="cursor-pointer rounded-[0.625rem] bg-[#5F28CD] px-4 py-2 md:px-5 xl:px-7 xl:py-3 text-sm md:text-base font-bold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c] inline-block"
                        >
                            Login
                        </Link>
                    </li>
                </ul>

            </nav>
        </div>
    );
}