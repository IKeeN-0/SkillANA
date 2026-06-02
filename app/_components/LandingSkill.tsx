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
        <div id="badges" className="mx-auto my-10 h-auto w-[96.5%] px-6 py-20 md:px-[16.5%] md:py-27.5">
            <h2 className="mb-4.5 w-full max-w-md text-[1.8em] md:text-[2em] font-bold">
                Discover new possibilities
            </h2>

            <p className="mb-10 md:mb-20 w-full max-w-xl text-[1rem] md:text-[1.125rem]">
                Browse skills you're interested in and take a quiz to earn your digital badge.
            </p>

            <div className="relative h-64 md:h-110 w-full rounded-[0.625rem] border border-solid border-white bg-[#16023f] p-4 md:p-6 overflow-hidden">
                
                {badges.length > 0 ? (
                    <div className={styles['animate-scroll-up']}>
                        
                        <div className={styles['badge-grid-layout']}>
                            {badges.map((badge) => (
                                <div 
                                    key={`main-${badge._id}`} 
                                    className="relative flex h-20 w-20 md:h-32 md:w-32 lg:h-37 lg:w-37 shrink-0 items-center justify-center rounded-full bg-white shadow-lg"
                                >
                                    <Image 
                                        src={badge.imgUrl.startsWith('/') ? badge.imgUrl : `/${badge.imgUrl}`} 
                                        alt={badge.badgeName} 
                                        width={100} 
                                        height={100}
                                        className="object-contain p-2 md:p-3 lg:p-0"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={styles['badge-grid-layout']}>
                            {badges.map((badge) => (
                                <div 
                                    key={`clone-${badge._id}`} 
                                    className="relative flex h-20 w-20 md:h-32 md:w-32 lg:h-37 lg:w-37 shrink-0 items-center justify-center rounded-full bg-white shadow-lg "
                                >
                                    <Image 
                                        src={badge.imgUrl.startsWith('/') ? badge.imgUrl : `/${badge.imgUrl}`} 
                                        alt={badge.badgeName} 
                                        width={100} 
                                        height={100}
                                        className="object-contain p-2 md:p-3 lg:p-0"
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