import Main from './_components/main'
import { Suspense } from 'react'
export default function AllBadge() {
    return (
        
        <Suspense fallback={
                <div className="w-full h-[80vh] flex flex-col justify-center items-center text-white/80">
                    <p className="animate-pulse">Loading execution environment...</p>
                </div>
            }>
            <Main mode = "all"/>
        </Suspense>
    
    )
}