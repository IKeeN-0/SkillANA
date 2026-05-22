import Image from 'next/image';

export function Footer() {
  return (
    <>
      <div className="flex items-center justify-between w-full h-auto bg-transparent border-t border-[#ffffff4d] mx-auto mb-[2em] py-[6em] ">
        
        {/* .leftSide */}
        <div className="flex flex-col gap-5 w-75 ml-[9em]">
          <h2 className="text-[22px] font-semibold ">SkillANA</h2>
          <p className="text-[14px] ">
            Simple, smart, and effective. SkillANA helps you organize your professional growth in one place.
          </p>
          <p className="inline self-start text-[14px] underline cursor-pointer hover:text-[#999999] transition-all">read more →</p>
        </div>

        {/* .rightSide */}
        <div className="grid grid-cols-4 relative right-[2.75em] w-[45%]">
          
          <div>
            <h4 className="mb-[1.5em] text-[16px] font-semibold ">Product</h4>
            <ul className="list-none text-[14px] text-gray-300 ">
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Features
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Skills
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Resume
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[1.5em] text-[16px] font-semibold ">Resources</h4>
            <ul className="list-none text-[14px] text-gray-300 ">
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Guide
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Templates
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Community
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[1.5em] text-[16px] font-semibold ">Contact</h4>
            <ul className="list-none text-[14px] text-gray-300 ">
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Facebook
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Twitter
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Instagram
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[1.5em] text-[16px] font-semibold ">Policies</h4>
            <ul className="list-none text-[14px] text-gray-300 ">
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Terms
              </li>
              <li className="mb-3.75 cursor-pointer transition-colors duration-300 hover:text-white">
                Privacy
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="mx-auto w-[90%] h-[1.5px] bg-[#ffffff4d] "></div>

      {/* .logo */}
      <div className="flex flex-col justify-center items-center gap-2 mt-[2em] mx-auto pb-[2em] ">
        <div className="relative w-[3em] h-[3em]">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain" 
          />
        </div>
        <p className="text-[13px] text-gray-200 ">©2026 SkillAna. All rights reserved.</p>
      </div>
    </>
  );
}