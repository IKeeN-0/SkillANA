import "@/app/globals.css";
import Navbar from "../_global_components/authen_pages/login_nav";
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    // ลบ <html> และ <body> ทิ้งให้หมด!
    <>
      <Navbar /> {/* ถ้าใน Root Layout มี Navbar อยู่แล้ว ตัวนี้อาจจะซ้ำซ้อนนะ */}
      {children}
    </>
  );
}