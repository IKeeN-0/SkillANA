import { Navbar } from "@/app/_global_components/navbar/navbar";
import { Hero } from "@/app/my-resume/_components/hero";
import { Template } from "@/app/my-resume/_components/template";
import  Footer  from "@/app/_global_components/footer/footer"
import Bg from "@/app/_global_components/background/pageBackground"

export default function Home() {
    return(
        <div className="relative w-full text-white flex flex-col"> 

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            <Navbar />
            <main>
                <Hero />
                <Template />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}