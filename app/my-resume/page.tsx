import { Navbar } from "@/app/_global_components/navbar/navbar";
import { Hero } from "@/app/my-resume/_components/hero";
import { Template } from "@/app/my-resume/_components/template";
import  Footer  from "@/app/_global_components/footer/footer"

export default function Home() {
    return(
        <>
            <Navbar />
            <main>
                <Hero />
                <Template />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}