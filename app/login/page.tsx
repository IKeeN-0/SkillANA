import Link from "next/link"
import Form from "./_components/login_form"
import LeftBox from "../_global_components/authen_pages/left_box"
import Bg from "../_global_components/background/pageBackground"

export default function Login() {
    return (
        // เพิ่ม h-screen และ overflow-hidden ตรงนี้
        <div className="relative w-full text-white"> 
            
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            <main className="relative z-10 w-full h-full flex flex-col xl:flex-row justify-center items-center xl:items-start">
                <LeftBox></LeftBox>
                
                <section className="flex flex-col w-full xl:w-[50%] h-full items-center justify-center mx-auto px-3 sm:px-0">

                    <div className="flex flex-col justify-center items-center mt-15">
                        <h3 className="text-[1.8em] font-bold">Welcome Back!</h3>
                        
                        <h6 className="text-[0.9em] sm:text-large pt-[0.2em] text-center sm:text-left">Login to your account to connect with features</h6>
                    </div>

                    <Form></Form>

                    <div className="flex flex-col"></div>
                </section>
            </main> 
        </div>
    )
}