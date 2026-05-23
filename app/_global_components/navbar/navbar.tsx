'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null)
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
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token!) as { id: string };
    const userID = decoded.id
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userID}`, {
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
      });

      const data = await res.json();
      setImg(data.profileImg);
      setName(data.firstName)
    };

    fetchUser();
  }, []);

  return (
    // <div className="fixed top-0 left-0 right-0 z-1000 w-full ">
      <nav className="flex items-center justify-between text-[1rem] font-bold w-full px-8 h-15 bg-[#140b2e] sticky top-0 z-1000">
        
        <div className="flex-1 flex justify-start">
            <Link href="/home" className="w-35">
                <img src="/SkillAna.png" alt="SkillANA Logo" className="block w-full" />
            </Link>
        </div>

        <ul className="flex gap-[3.437rem] group/menu justify-center">
          {navLinks.map((link, index) => {
            
            // 3. แก้ไขเงื่อนไข isActive ตรงนี้!
            // ตัดเครื่องหมาย '/' ด้านหน้าออกเพื่อเอาไปเทียบกับ fromSource (เช่น '/skills' กลายเป็น 'skills')
            const linkNameForCheck = link.href.replace('/', ''); 
            
            // ถัาอยู่หน้า /badge และ query ?from=... ตรงกับเมนูนี้ ให้ถือว่า Active
            const isTestOrResultRoute = pathname.startsWith('/badge/test') || pathname.includes('/result');

            const isBadgeRouteActive = 
              (pathname.startsWith('/badge') && fromSource === linkNameForCheck) ||
              (isTestOrResultRoute && link.href === '/skills');
            
            // รวมเงื่อนไข: เป็นหน้าของเมนูนั้นๆ หรือ เป็นหน้า badge ที่มาจากเมนูนั้นๆ
            const isActive = pathname.startsWith(link.href) || isBadgeRouteActive;
            
            const liWidth = index === 0 || index === 1 ? 'w-[6.875rem]' : 'w-[8.75rem]';
            
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
            <Link href="/profile" className="flex items-center justify-start w-48 h-10 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                
                <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center border border-solid border-[#ffffff99]">
                    <img 
                        src={img || "user.png"} 
                        alt="profile navbar"
                        className="w-full h-full object-cover block"
                    />
                </div>
                
                <span className="ml-4 flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left" title={name || ""}>
                    {name}
                </span>
                
            </Link>
        </div>

    </nav>
    // </div>
    
  );
}