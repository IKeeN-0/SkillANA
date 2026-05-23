interface InputProps {
    text: string | undefined;
    isSelected: boolean;
    onClick: () => void; 
}

export default function Choice({ text, isSelected, onClick }: InputProps) {
    return (
        <div 
            className={`rounded-[10px] p-[.75em] pl-[2em] cursor-pointer transition-all duration-200 ${
                isSelected ? "bg-[#5F28CD] text-[1.1em] font-medium shadow-lg" : "bg-[#f0e9ff] text-[#2a1554] text-[1em] font-medium "
            }`} 
            onClick={onClick} 
        >
            {text}
        </div>
    );
}