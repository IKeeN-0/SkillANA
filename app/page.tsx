import { LandingPageNavbar, Hero_section, SkillSection, ResumeSection, CloseSection, Footer } from "./_components/landingPage";

export default function LandingPage() {
    return(
        <div className="bg-gradient-to-r from-[#2F2155] from-20% to-[#833FC2] to-100% text-white">
            <LandingPageNavbar />
            
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