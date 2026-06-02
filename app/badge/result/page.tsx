import ResultMain from "./_components/resultMain";
import Bg from "@/app/_global_components/background/pageBackground"
import { Navbar } from "@/app/_global_components/navbar/navbar";
import Footer from "@/app/_global_components/footer/footer"
import { Suspense } from "react"; // 1. Import Suspense เข้ามา

export default function Result(){
    return (
        <div className="relative w-full min-h-screen text-white flex flex-col overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>

            <Navbar></Navbar>

            {/* 2. ใช้ Suspense ครอบเฉพาะส่วนของ ResultMain */}
            <Suspense fallback={
                <div className="w-full h-[80vh] flex flex-col justify-center items-center text-white/80">
                    <p className="animate-pulse">Loading execution environment...</p>
                </div>
            }>
                <ResultMain />
            </Suspense>
            
            <footer className="shrink-0 mt-auto">
                <Footer />
            </footer>
        </div>
    )
}