import Image from 'next/image';

export function SkillSection() {
    return (
        <div id="badges" className="mx-auto my-10 h-225 w-[96.5%] px-[5%] py-27.5 md:px-[16.5%]">
            <h2 className="mb-4.5 w-full max-w-75 text-[2em] font-bold">
                Discover new possibilities
            </h2>

            <p className="mb-20 w-full max-w-95 text-[1.125rem]">
                Browse skills you're interested in and take a quiz to earn your digital badge.
            </p>

            <div className="h-100 w-full rounded-[0.625rem] border border-solid border-white bg-gray-500/25"></div>
        </div>
    );
}