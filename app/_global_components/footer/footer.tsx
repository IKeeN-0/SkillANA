import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-between w-[100%] h-[2.2em] bg-[#340648] mx-auto">
        {/* .logo */}
        <div className="flex flex-col justify-center items-center gap-[8px] mx-auto ">
          <p className="text-[13px] text-gray-200 ">©2026 SkillAna. All rights reserved.</p>
        </div> 
      </div>
    </>
  );
}