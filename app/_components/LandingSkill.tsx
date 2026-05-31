import Image from 'next/image';
import styles from '@/app/_components/LandingSkill.module.css';

export interface BadgeData {
    _id: string;
    badgeName: string;
    imgUrl: string;
}

interface SkillSectionProps {
    badges?: BadgeData[];
}

export function SkillSection({ badges = [] }: SkillSectionProps) {
    return (
        <div id="badges" className="mx-auto my-10 h-245 w-[96.5%] px-[5%] py-27.5 md:px-[16.5%]">
            <h2 className="mb-4.5 w-full max-w-75 text-[2em] font-bold">
                Discover new possibilities
            </h2>

            <p className="mb-20 w-full max-w-95 text-[1.125rem]">
                Browse skills you're interested in and take a quiz to earn your digital badge.
            </p>

            <div className="relative h-110 w-full rounded-[0.625rem] border border-solid border-white bg-[#16023f] p-6 overflow-hidden">
                
                {badges.length > 0 ? (
                    <div className={styles['animate-scroll-up']}>
                        
                        {/* ================= ชุดที่ 1 ================= */}
                        <div className={styles['badge-grid-layout']}>
                            {badges.map((badge) => (
                                <div 
                                    key={`main-${badge._id}`} 
                                    className="relative flex h-37 w-37 shrink-0 items-center justify-center rounded-full bg-white shadow-lg"
                                >
                                    <Image 
                                        src={badge.imgUrl.startsWith('/') ? badge.imgUrl : `/${badge.imgUrl}`} 
                                        alt={badge.badgeName} 
                                        width={110} 
                                        height={110}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* ================= ชุดที่ 2 ================= */}
                        <div className={styles['badge-grid-layout']}>
                            {badges.map((badge) => (
                                <div 
                                    key={`clone-${badge._id}`} 
                                    className="relative flex h-37 w-37 shrink-0 items-center justify-center rounded-full bg-white shadow-lg "
                                >
                                    <Image 
                                        src={badge.imgUrl.startsWith('/') ? badge.imgUrl : `/${badge.imgUrl}`} 
                                        alt={badge.badgeName} 
                                        width={110} 
                                        height={110}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                ) : (
                    <p className="text-white w-full text-center mt-10">No badges found.</p>
                )}

            </div>
        </div>
    );
}