import {Navbar} from "@/app/_global_components/navbar/navbar";
import { Show_badge } from "@/app/home/_components/show_badge";
import { Help } from "@/app/home/_components/help";
import { ProgressStats } from "@/app/home/_components/graph";
import  Footer  from "@/app/_global_components/footer/footer"
import Bg from "@/app/_global_components/background/pageBackground"

export default function Home() {
    return(
        <div className="relative w-full text-white flex flex-col overflow-hidden"> 

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <Navbar />
            <main>
                <Show_badge />
                <ProgressStats />
                <Help />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}