import { Navbar } from "@/app/_global_components/navbar/navbar";
import { HomeNameDisplay } from "@/app/home/_components/display";
import { Show_badge } from "@/app/home/_components/show_badge";
import { Help } from "@/app/home/_components/help";
import { ProgressStats } from "@/app/home/_components/graph";
import  Footer  from "@/app/_global_components/footer/footer"
import Bg from "@/app/_global_components/background/pageBackground"

export default function Home() {
    
    return(
        <div className="relative w-full text-white flex flex-col min-h-screen overflow-hidden"> 

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <Navbar />
            
            <main className="w-[98%] mx-auto flex flex-col flex-1">
                
                <HomeNameDisplay />

                <div className="grid grid-cols-1 lg:grid-cols-5 w-full">
                    
                    {/* ซ้าย */}
                    <div className="lg:col-span-3 flex flex-col gap-6 w-full">
                        <Show_badge />
                        <Help />
                    </div>

                    {/* ขวา */}
                    <div className="lg:col-span-2 w-full h-full">
                        <ProgressStats />
                    </div>

                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}