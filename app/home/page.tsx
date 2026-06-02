import { Navbar } from "@/app/_global_components/navbar/navbar";
import { HomeNameDisplay } from "@/app/home/_components/display";
import { Show_badge } from "@/app/home/_components/show_badge";
import { Help } from "@/app/home/_components/help";
import { ProgressStats } from "@/app/home/_components/graph";
import Footer from "@/app/_global_components/footer/footer";
import Bg from "@/app/_global_components/background/pageBackground";

export default function Home() {
    return (
        // เปลี่ยนจาก 2xl: เป็น min-[1921px]: 
        // ทำให้จอ 1920x1080 ลงมา (โน้ตบุ๊กทั่วไป) เป็น min-h-screen และเลื่อนได้
        <div className="relative w-full text-white flex flex-col min-h-screen min-[1921px]:h-screen min-[1921px]:overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <Navbar />

            <main className="w-[90%] lg:w-[94%] xl:w-[96%] mx-auto flex flex-col flex-1 pb-10 min-[1921px]:pb-0 overflow-y-auto min-[1921px]:overflow-hidden">
                
                <HomeNameDisplay />

                <div className="flex flex-col xl:grid xl:grid-cols-5 w-full gap-6 xl:gap-6 flex-1 min-[1921px]:pb-4">
                    
                    <div className="order-1 xl:col-span-3 xl:col-start-1 xl:row-start-1 w-full">
                        <Show_badge />
                    </div>

                    <div className="order-2 xl:col-span-2 xl:col-start-4 xl:row-start-1 xl:row-span-2 w-full h-full">
                        <ProgressStats />
                    </div>

                    <div className="order-3 xl:col-span-3 xl:col-start-1 xl:row-start-2 w-full"> 
                        <Help />
                    </div>
                    
                </div>
            </main>

            <footer className="min-[1921px]:mt-auto">
                <Footer />
            </footer>
        </div>
    );
}