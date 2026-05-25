import LeftBox from "../_global_components/authen_pages/left_box"
import CreateAccountForm from "./_components/create_form"
import Bg from "../_global_components/background/pageBackground"

export default function Login() {
    return (
        <div className="relative w-full text-white"> 
            
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            <main className="relative z-10 w-full h-full flex justify-center">
                <LeftBox />
                <section className="flex flex-col w-[50%] h-full items-center">
                    <CreateAccountForm />
                </section>
            </main>
        </div>
    )
}