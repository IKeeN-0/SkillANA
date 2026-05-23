import { Navbar } from "@/app/_global_components/navbar/navbar";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col h-screen w-full overflow-hidden text-white">
          {children}
      </div>
    </>
  );
}