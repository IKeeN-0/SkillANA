import Link from 'next/link';

export function CloseSection() {
    return (
        <div className="mx-auto my-10 flex h-140 w-[96.5%] flex-col items-center justify-center rounded-[0.625rem] p-30 text-center">
            <h2 className="mb-4.5 mt-0 text-[2.5rem] font-bold ">
                Ready to Level Up Your Profile?
            </h2>

            <p className="mb-15 mt-0 w-full max-w-127.5 text-[1.2rem]">
                Ready to build your profile? Join SkillANA and start showcasing your skills today.
            </p>

            <Link href="/create-account" className="inline-block rounded-[0.625rem] bg-[#5F28CD] px-11 py-4 text-[1.12rem] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c]">
                Get Started for Free →
            </Link>
        </div>
    );
}