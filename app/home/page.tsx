import {Navbar} from "@/app/_global_components/navbar/navbar";
import { Hero_section, ResumeSection } from "@/app/_global_components/home_page/home";
import { Show_badge } from "@/app/home/_components/show_badge";
import { Help } from "@/app/home/_components/help";
import  Footer  from "@/app/_global_components/footer/footer"

export default function Home() {
    return(
        <div className="bg-gradient-to-r from-[#2F2155] from-20% to-[#833FC2] to-100% text-white">
            <Navbar />
            <main>
                <Hero_section />
                <Show_badge />
                <ResumeSection />
                <Help />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}