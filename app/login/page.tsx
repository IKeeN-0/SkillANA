import Link from "next/link"
import Form from "./_components/login_form"
import LeftBox from "../_global_components/authen_pages/left_box"
import Bg from "../_global_components/background"

export default function Login() {
    return (
        <div className="relative w-full min-h-screen text-white"> 
            <main className="w-full h-[90vh] flex">

                <div className="absolute inset-0 -z-10">
                    <Bg />
                </div>

                <LeftBox></LeftBox>
                
                <section className="flex flex-col items-center w-[50%] mt-[4em] ">
                    <Link 
                        href='/' 
                        className="relative inline-block self-start text-[0.9em] ml-[9em] mb-[1.5em] text-gray-300 hover:text-white transition-all duration-300 
                                    after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-white 
                                    after:opacity-0 after:translate-y-[2px] hover:after:opacity-100 hover:after:translate-y-0 after:transition-all after:duration-300"
                    >
                        &lt; Back
                    </Link>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-[1.8em] font-bold">Welcome Back!</h3>
                        
                        <h6 className="text-large pt-[0.2em] ">Login to your account to connect with features</h6>
                    </div>

                    <Form></Form>

                    <div className="flex flex-col"></div>
                </section>
            </main> 
        </div>
    )
}