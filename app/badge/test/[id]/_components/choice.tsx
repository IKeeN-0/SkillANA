import styles from "./choice.module.css"

interface InputProps {
    text: string | undefined; // ใช้ string ตัวเล็กจะดีกว่าครับ (Standard TS)
    isSelected: boolean;
    onClick: () => void; // เพิ่มบรรทัดนี้: บอกว่า Choice จะรับฟังก์ชันที่ไม่มีการ return ค่า
}

export default function Choice({ text, isSelected, onClick }: InputProps) {
    return (
        <div 
            className={`${styles.choice} ${isSelected ? styles.selected : ""}`} 
            onClick={onClick} // นำ onClick ที่รับมา มาใส่ใน div ตรงนี้
        >
            {text}
        </div>
    );
}