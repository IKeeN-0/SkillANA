import MainBox from "./_components/main"
import Bg from "@/app/_global_components/background/pageBackground"
import { Navbar } from "@/app/_global_components/navbar/navbar";
import Footer from "@/app/_global_components/footer/footer"

export default async function TestMain({params} : {params : Promise<{ id : string}>}){
    const data = await params;
    const id = data.id;
    return (
        <div className="relative w-full min-h-screen text-white flex flex-col overflow-hidden">

            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            <Navbar></Navbar>

            <MainBox id={id}></MainBox>

            <footer className="shrink-0 mt-auto">
                <Footer />
            </footer>
        </div>
    )
}