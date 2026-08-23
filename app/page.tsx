import { LandingPageNavbar } from "./_components/LandingNavbar";
import { Hero_section } from "./_components/LandingHero";
import { SkillSection } from "./_components/LandingSkill";
import { ResumeSection } from "./_components/LandingResume";
import { CloseSection } from "./_components/LandingClose";
import { Footer } from "./_components/LandingFooter";
import Bg from "@/app/_global_components/background/landingBackground"
import dbConnect from '@/lib/db';
import { Badge } from '@/lib/models/schema';
import FadeUp from "./_components/FadeUp";

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
    await dbConnect();

    const rawBadges = await Badge.find({}).lean();

    const formattedBadges = rawBadges.map((badge) => ({
        _id: badge._id.toString(),
        badgeName: badge.badgeName,
        imgUrl: badge.imgUrl.startsWith('/') ? badge.imgUrl : `/${badge.imgUrl}`,
    }));

    return(
        <div className="relative w-full text-white flex flex-col overflow-hidden"> 
            
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            <nav>
                <LandingPageNavbar />
            </nav>
            
            <main >
                <FadeUp delay={0.1}>
                    <Hero_section />
                </FadeUp>

                <FadeUp delay={0.2}>
                    <SkillSection badges={formattedBadges} /> 
                </FadeUp>

                <FadeUp delay={0.3}>
                    <ResumeSection />
                </FadeUp>

                <FadeUp delay={0.4}>
                    <CloseSection />
                </FadeUp>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}