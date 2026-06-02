import Image from 'next/image';

export function Footer() {
  return (
    <>
      {/* ใช้ระบบ Grid จัดโครงสร้างและควบคุม Padding บน Mobile (px-4) เพื่อไม่ให้เนื้อหาหลุดขอบเอียง */}
      <div className="mx-auto w-full h-[1.5px] bg-[#ffffff4d] "></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-start justify-center w-[92%] max-w-6xl h-auto mx-auto mb-[2em] py-[3em] lg:py-[6em] gap-8 md:gap-y-12 px-2">
        
        {/* ข้อความฝั่งซ้ายขยายเต็มความกว้างในหน้าจอมือถือ (col-span-2) */}
        <div className="flex flex-col gap-4 w-full col-span-2 md:col-span-3 lg:col-span-2">
          <h2 className="text-[20px] md:text-[22px] font-semibold text-white">SkillANA</h2>
          <p className="text-[13px] md:text-[14px] text-gray-300 leading-relaxed">
            Simple, smart, and effective. SkillANA helps you organize your professional growth in one place.
          </p>
          <p className="inline self-start text-[13px] md:text-[14px] underline cursor-pointer hover:text-[#999999] transition-all">read more →</p>
        </div>

        {/* คอลัมน์เมนูย่อย จัดการแบ่งฝั่งละ 2 บล็อกอัตโนมัติบนหน้าจอมือถือพอดี */}
        <div className="w-full">
          <h4 className="mb-[0.8em] lg:mb-[1.5em] text-[15px] md:text-[16px] font-semibold text-white">Product</h4>
          <ul className="list-none text-[13px] md:text-[14px] text-gray-300 p-0 m-0">
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Features</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Skills</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Resume</li>
          </ul>
        </div>

        <div className="w-full">
          <h4 className="mb-[0.8em] lg:mb-[1.5em] text-[15px] md:text-[16px] font-semibold text-white">Resources</h4>
          <ul className="list-none text-[13px] md:text-[14px] text-gray-300 p-0 m-0">
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Guide</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Templates</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Community</li>
          </ul>
        </div>

        <div className="w-full">
          <h4 className="mb-[0.8em] lg:mb-[1.5em] text-[15px] md:text-[16px] font-semibold text-white">Contact</h4>
          <ul className="list-none text-[13px] md:text-[14px] text-gray-300 p-0 m-0">
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Facebook</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Twitter</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Instagram</li>
          </ul>
        </div>

        <div className="w-full">
          <h4 className="mb-[0.8em] lg:mb-[1.5em] text-[15px] md:text-[16px] font-semibold text-white">Policies</h4>
          <ul className="list-none text-[13px] md:text-[14px] text-gray-300 p-0 m-0">
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Terms</li>
            <li className="mb-3 cursor-pointer transition-colors duration-300 hover:text-white">Privacy</li>
          </ul>
        </div>

      </div>

      <div className="mx-auto w-[90%] h-[1.5px] bg-[#ffffff4d] "></div>

      {/* ลิขสิทธิ์ด้านล่างสุด */}
      <div className="flex flex-col justify-center items-center gap-2 mt-[2em] mx-auto pb-[2em] ">
        <div className="relative w-[2.5em] h-[2.5em]">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain" 
          />
        </div>
        <p className="text-[12px] md:text-[13px] text-gray-200 ">©2026 SkillAna. All rights reserved.</p>
      </div>
    </>
  );
}