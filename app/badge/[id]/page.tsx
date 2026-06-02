import BadgePage from "./_components/main";
import Bg from "@/app/_global_components/background/pageBackground"
import { Navbar } from "@/app/_global_components/navbar/navbar";
import Footer from "@/app/_global_components/footer/footer"

export default async function BadgeInfo({params} : {params : Promise<{ id : string}>}){
    const data = await params;
    const id = data.id;
    return(
        <div className="relative w-full h-screen text-white flex flex-col overflow-hidden">

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <div className="shrink-0 w-full z-50">
                <Navbar />
            </div>
            
            <main className="flex-1 w-full overflow-y-auto flex flex-col scroll-smooth">
                
                <BadgePage id={id} />

                <div className="shrink-0 w-full mt-auto">
                    <Footer />
                </div>
                
            </main>
        </div>
    )
}