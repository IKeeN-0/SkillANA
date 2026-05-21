'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null)
  const pathname = usePathname();

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
    <nav className="flex items-center justify-between text-[1rem] font-bold w-full px-[2rem] h-[3.75rem] bg-gradient-to-r from-[#2f2155] from-20% to-[#833fc2] to-100% border-b border-solid border-[#7050B3] sticky top-0 z-[1000]">
        
        {/* ส่วนซ้าย: Logo ให้กินพื้นที่ flex-1 และชิดซ้าย */}
        <div className="flex-1 flex justify-start">
            <Link href="/home" className="w-[8.75rem]">
                <img src="/SkillAna.png" alt="SkillANA Logo" className="block w-full" />
            </Link>
        </div>

        {/* ส่วนกลาง: Menu จะอยู่กึ่งกลางพอดีเพราะซ้ายกับขวาดันเท่ากัน */}
        <ul className="flex gap-[3.437rem] group/menu justify-center">
          {navLinks.map((link, index) => {
            const isActive = pathname.startsWith(link.href);
            
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
            <Link href="/profile" className="flex items-center justify-start w-[12rem] h-[2.5rem] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                
                <div className="w-[40px] h-[40px] flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center border-[1px] border-solid border-[#ffffff99]">
                    <img 
                        src={img || "user.png"} 
                        alt="profile navbar"
                        className="w-full h-full object-cover block"
                    />
                </div>
                
                <span className="ml-[1rem] flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left" title={name || ""}>
                    {name}
                </span>
                
            </Link>
        </div>

    </nav>
  );
}