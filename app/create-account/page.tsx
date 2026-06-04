import LeftBox from "../_global_components/authen_pages/left_box"
import CreateAccountForm from "./_components/create_form"
import Bg from "../_global_components/background/pageBackground"

export default function Login() {
    return (
        <div className="relative w-full text-white"> 
            
            <div className="absolute inset-0 -z-10">
                <Bg />
            </div>
            
            {/* โทรศัพท์/ไอแพด: จัดแนวดิ่ง (flex-col) จัดกึ่งกลาง | คอมพิวเตอร์ (xl:): จัดแนวขนานขนาบข้าง */}
            <main className="relative z-10 w-full h-full flex flex-col xl:flex-row justify-center items-center xl:items-start">
                <LeftBox />
                
                {/* โทรศัพท์/ไอแพด: ขยายเต็มจอ w-full เพื่อจัดกึ่งกลาง | คอมพิวเตอร์ (xl:): กลับไปใช้ขนาด w-[50%] ตามเดิมของคุณ */}
                <section className="flex flex-col w-full xl:w-[50%] h-full items-center justify-center mx-auto">
                    <CreateAccountForm />
                </section>
            </main>
        </div>
    )
}