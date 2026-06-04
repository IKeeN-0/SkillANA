import Link from "next/link"
import Form from "./_components/login_form"
import LeftBox from "../_global_components/authen_pages/left_box"
import Bg from "../_global_components/background/pageBackground"

export default function Login() {
    return (
        <div className="relative w-full text-white h-[90vh] overflow-hidden"> 
            
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            <main className="relative z-10 w-full h-full flex flex-col xl:flex-row justify-center items-center xl:items-start">
                <LeftBox></LeftBox>
                
                <section className="flex flex-col w-full xl:w-[50%] h-full items-center justify-center mx-auto px-3 sm:px-0">

                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-3xl lg:text-5xl font-bold">Welcome Back!</h3>
                        
                        <h6 className="text-base lg:text-xl pt-[0.5em] text-center sm:text-left text-gray-300">Login to your account to connect with features</h6>
                    </div>

                    <Form></Form>

                    <div className="flex flex-col"></div>
                </section>
            </main> 
        </div>
    )
}