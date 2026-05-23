interface InputProps{
    focus : boolean,
    done : boolean
    onClick : ()=> void;
}

export default function Dot({focus, done, onClick} : InputProps){
    return (
        <div 
            onClick={onClick}
            className={`mt-5 w-[.8em] h-[.8em] rounded-full cursor-pointer transition-colors duration-200 ${
                focus ? "!bg-black" : done ? "bg-[#5F28CD]" : "bg-white"
            }`}
        ></div>
    )
}