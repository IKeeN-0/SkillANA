import UseClientPage from "./_components/useClientPage";
import Bg from "../_global_components/background/pageBackground"
import Footer from "@/app/_global_components/footer/footer"

export default function Profile () {
  return(
    <div className="relative w-full text-white"> 

      <div className="absolute inset-0 -z-10">
        <Bg />
      </div>

      <main>
        <UseClientPage />
      </main>

      <Footer />
    </div>
  
  
  
  )
 
}