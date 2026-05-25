interface InputProps{
    focus : boolean,
    done : boolean
    onClick : ()=> void;
}

export default function Dot({focus, done, onClick} : InputProps){
    return (
        <div 
            onClick={onClick}
            className={`mt-5 w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                focus 
                ? "bg-[#5F28CD] ring-4 ring-[#5F28CD]/40 scale-110" // กำลังทำ ม่วง + วงแหวน
                : done 
                ? "bg-[#5F28CD]" // ทำเสร็จแล้ว ม่วงทึบ
                : "bg-white/60 hover:bg-white" // ยังไม่ได้ทำ ขาวขุ่น
            }`}
        ></div>
    )
}