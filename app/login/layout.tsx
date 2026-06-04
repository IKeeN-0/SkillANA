import "@/app/globals.css";
import Navbar from "../_global_components/authen_pages/login_nav";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
