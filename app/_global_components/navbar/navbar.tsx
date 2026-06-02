'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fromSource = searchParams.get('from');

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Skills', href: '/skills' },
    { name: 'Collection', href: '/collections' },
    { name: 'My Resume', href: '/my-resume' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token!) as { id: string };
      const userID = decoded.id;
      const fetchUser = async () => {
        const res = await fetch(`/api/users/${userID}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await res.json();
        setImg(data.profileImg);
        setName(data.firstName);
      };

      fetchUser();
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }, []);

  const checkIsActive = (linkHref: string) => {
    const linkNameForCheck = linkHref.replace('/', ''); 
    const isTestOrResultRoute = pathname.startsWith('/badge/test') || pathname.includes('/result');
    const isResumeExportRoute = pathname.includes('/resume-export');

    const isBadgeRouteActive = 
      (pathname.startsWith('/badge') && fromSource === linkNameForCheck) ||
      (isTestOrResultRoute && linkHref === '/skills');

    return pathname.startsWith(linkHref) || 
           isBadgeRouteActive || 
           (isResumeExportRoute && linkHref === '/my-resume');
  };

  return (
    <>
      <nav className="flex items-center justify-between text-[1rem] font-bold w-full px-4 md:px-8 h-15 bg-[#140b2e] sticky top-0 z-1000">
        
        <div className="flex-1 flex justify-start items-center gap-3 md:gap-4">
            {/* Hamburger Button (Mobile) */}
            <button 
              className="md:hidden text-white p-1 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* โลโก้ไล่ระดับขนาดตามหน้าจออุปกรณ์อย่างละเอียด */}
            <Link href="/home" className="w-24 lg:w-28 xl:w-35 shrink-0">
                <img src="/SkillAna.png" alt="SkillANA Logo" className="block w-full" />
            </Link>
        </div>

        {/* แถบเมนูกลาง: ไล่ระดับความห่าง (Gap) เคลียร์พื้นที่ให้หน้าจอ Tablet */}
        <ul className="hidden md:flex gap-2 lg:gap-6 xl:gap-[3.437rem] group/menu justify-center">
          {navLinks.map((link, index) => {
            const isActive = checkIsActive(link.href);
            
            {/* ไล่ระดับความกว้าง (Width) ของแต่ละเมนูตามขนาดหน้าจอเพื่อไม่ให้เบียดกัน */}
            const liWidth = index === 0 || index === 1 
              ? 'w-16 lg:w-22 xl:w-[6.875rem]' 
              : 'w-22 lg:w-30 xl:w-[8.75rem]';
            
            const liBase = `flex relative h-[3.75rem] group/item after:content-[''] after:absolute after:bottom-0 after:left-[80%] after:h-[0.375rem] after:bg-[#5F28CD] after:rounded-[0.625rem] after:transition-all after:duration-300 after:ease-in-out after:-translate-x-[80%] hover:after:w-full`;
            const liActive = isActive ? 'after:w-full group-hover/menu:after:w-0 hover:after:!w-full' : 'after:w-0';

            const linkBase = `w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover/item:text-white`;
            const linkActive = isActive ? 'text-white group-hover/menu:text-[#b9b9b9] group-hover/item:!text-white' : 'text-[#b9b9b9]';

            return (
              <li key={link.href} className={`${liBase} ${liWidth} ${liActive}`}>
                <Link 
                  href={link.href}
                  className={`${linkBase} ${linkActive}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex-1 flex justify-end">
            {/* ปรับความกว้างกล่องโปรไฟล์ตามขนาดหน้าจอ */}
            <Link href="/profile" className="flex items-center justify-end md:justify-start w-auto lg:w-40 xl:w-48 h-10 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                
                <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center border border-solid border-[#ffffff99]">
                    <img 
                        src={img || "/user.png"} 
                        alt="profile navbar"
                        className="w-full h-full object-cover block"
                    />
                </div>
                
                {/* ซ่อนชื่อในจอ iPad แนวตั้ง (md) เพื่อให้เมนูกลางมีพื้นที่ และจะกลับมาแสดงผลตั้งแต่จอใหญ่ (lg) ขึ้นไป */}
                <span className="hidden lg:block ml-4 flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left" title={name || ""}>
                    {name}
                </span>
            </Link>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-1001 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#140b2e] z-1002 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#ffffff1a]">
          <img src="/SkillAna.png" alt="SkillANA Logo" className="w-24" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#b9b9b9]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col mt-6 font-bold text-[1rem]">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.href);
            const activeMobileClass = isActive 
              ? 'text-white border-l-4 border-[#5F28CD] bg-[#ffffff0a] pl-5' 
              : 'text-[#b9b9b9] border-l-4 border-transparent pl-6 hover:bg-[#ffffff0a] hover:text-white';

            return (
              <li key={`mobile-${link.href}`}>
                <Link 
                  href={link.href}
                  className={`block py-4 transition-all duration-200 ${activeMobileClass}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}