import { LandingPageNavbar } from "./_components/LandingNavbar";
import { Hero_section } from "./_components/LandingHero";
import { SkillSection } from "./_components/LandingSkill";
import { ResumeSection } from "./_components/LandingResume";
import { CloseSection } from "./_components/LandingClose";
import { Footer } from "./_components/LandingFooter";
import Bg from "@/app/_global_components/background"

export default function LandingPage() {
    return(
         <div className="relative w-full text-white flex flex-col overflow-hidden"> 
            
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            <nav>
                <LandingPageNavbar />
            </nav>
            
            <main >
                <Hero_section />
                <SkillSection />
                <ResumeSection />
                <CloseSection />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}