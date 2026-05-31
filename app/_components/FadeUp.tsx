"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeUp({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // เริ่มต้นแบบโปร่งใสและอยู่ต่ำลงมา 40px
      whileInView={{ opacity: 1, y: 0 }} // เฟดและเลื่อนกลับมาจุดเดิมเมื่อเลื่อนมาถึง
      viewport={{ once: true, amount: 0.1 }} // เล่นแค่ครั้งเดียวเมื่อแสดงผลบนหน้าจอไปแล้ว 10%
      transition={{ duration: 0.6, delay, ease: "easeOut" }} // กำหนดความสมูท
    >
      {children}
    </motion.div>
  );
}