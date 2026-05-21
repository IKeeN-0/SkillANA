import LeftBox from "../_global_components/authen_pages/left_box"
import CreateAccountForm from "./_components/create_form"
import Bg from "../_global_components/background"

export default function Login() {
    return (
        // เพิ่ม relative ให้ div ตัวนอกสุด
        <div className="relative w-full min-h-screen text-white"> 
            
            {/* ทำให้ Bg เป็น absolute เพื่อให้มันไปอยู่ด้านหลัง */}
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            {/* เพิ่ม relative z-10 เพื่อให้เนื้อหาหลักลอยอยู่เหนือพื้นหลัง */}
            <main className="relative z-10 w-full h-[100vh] flex justify-center">
                <LeftBox />
                <section className="flex flex-col w-[50%] h-full items-center">
                    <CreateAccountForm />
                </section>
            </main>
        </div>
    )
}