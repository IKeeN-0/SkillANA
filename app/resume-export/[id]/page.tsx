import {Navbar} from "@/app/_global_components/navbar/navbar";
import Main from "./components/main";
import Bg from "@/app/_global_components/background/pageBackground"
import Footer from "@/app/_global_components/footer/footer"

export default async function Resume({params} : {params : Promise<{ id : string}>}){
    const data = await params
    const id = data.id
    return (
        <div className="relative w-full h-screen text-white flex flex-col overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <div className="flex flex-col h-screen w-full overflow-hidden">
                <Navbar></Navbar>
                
                <main className="w-full h-full flex">
                    <Main id={Number(id)}></Main>
                </main>
            </div>

            <footer className="shrink-0">
                <Footer />
            </footer>
        </div>
    )
}