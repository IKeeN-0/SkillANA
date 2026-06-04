import Image from "next/image";

export default function LeftBox() {
    return (
        <>
            {/* เปลี่ยนเป็น hidden xl:flex เพื่อปิดทั้งรูปและข้อความทั้งหมดในเซกชันนี้ บนจอโทรศัพท์, iPad ทุกรุ่น และ Laptop เล็ก */}
            {/* โดยจะยอมให้แสดงผลเฉพาะบนหน้าจอคอมพิวเตอร์ Desktop หรือ Laptop จอใหญ่ (xl) ขึ้นไปเท่านั้น */}
            <section className="hidden xl:flex flex-col pl-[6%] w-[45%] mt-[6%]">
                
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