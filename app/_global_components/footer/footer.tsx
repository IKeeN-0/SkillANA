import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-between w-full h-[1.8em] bg-[#340648] mx-auto">
        {/* .logo */}
        <div className="flex flex-col justify-center items-center gap-2 mx-auto ">
          <p className="text-[11.5px] text-gray-200 ">©2026 SkillAna. All rights reserved.</p>
        </div> 
      </div>
    </>
  );
}