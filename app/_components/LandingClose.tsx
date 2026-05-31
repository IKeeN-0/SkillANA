import Link from 'next/link';

export function CloseSection() {
    return (
        <div className="mx-auto my-10 flex h-auto md:h-140 w-[96.5%] flex-col items-center justify-center rounded-[0.625rem] py-16 px-4 md:p-30 text-center">
            {/* ปรับฟอนต์หัวข้อลงเหลือ text-[1.6rem] บนโทรศัพท์มือถือ */}
            <h2 className="mb-4.5 mt-0 text-[1.6rem] sm:text-[2rem] md:text-[2.5rem] font-bold leading-tight">
                Ready to Level Up Your Profile?
            </h2>

            {/* ปรับฟอนต์คำอธิบายลงเหลือ text-[0.95rem] บนโทรศัพท์มือถือ */}
            <p className="mb-10 mt-0 w-full max-w-127.5 text-[0.95rem] md:text-[1.2rem] text-white/80">
                Ready to build your profile? Join SkillANA and start showcasing your skills today.
            </p>

            <Link href="/create-account" className="inline-block rounded-[0.625rem] bg-[#5F28CD] px-8 py-3.5 md:px-11 md:py-4 text-[1rem] md:text-[1.12rem] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c]">
                Get Started for Free →
            </Link>
        </div>
    );
}