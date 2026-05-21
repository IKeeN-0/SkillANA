import styles from './landingPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

export function LandingPageNavbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[1000] w-full ">
            <nav className="flex h-[3.75rem] w-full items-center justify-between border-b border-[#7050B3] bg-gradient-to-r from-[#2F2155] via-[#2F2155] to-[#833FC2] text-[1rem] text-white px-[2rem] md:px-[2rem]">
                
                <Link href="/" className="relative w-[10em] h-[100%] ">
                    <Image 
                        src="/SkillAna.png" 
                        alt="SkillANA Logo" 
                        fill
                        className="object-contain block w-full"
                        priority
                    />
                </Link>

                <ul className="hidden md:flex flex-1 items-center justify-center gap-[3.75rem] list-none p-0 m-0">
                    <li className={styles.menu_item}>
                        <Link href="#features" className="h-full flex items-center justify-center w-full font-bold">Features</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link href="#badges" className="h-full flex items-center justify-center w-full font-bold">Badges</Link>
                    </li>
                    <li className={styles.menu_item_special}>
                        <Link href="#resume" className="h-full flex items-center justify-center w-full font-bold">Resume</Link>
                    </li>
                    <li className={styles.menu_item}>
                        <Link href="#" className="h-full flex items-center justify-center w-full font-bold">About Us</Link>
                    </li>
                </ul>

                <ul className="flex shrink-0 items-center gap-[2rem] whitespace-nowrap list-none p-0 m-0">
                    <li>
                        <Link href="/create-account" className="font-bold hover:text-gray-300 transition-all duration-300 ease-in-out">
                            Sign up
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/login" 
                            className="cursor-pointer rounded-[0.625rem] bg-[#5F28CD] px-[1.75rem] py-[0.75rem] font-bold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c] inline-block"
                        >
                            Login
                        </Link>
                    </li>
                </ul>

            </nav>
        </div>
    );
}

export function Hero_section() {
    return (
        <div id="features" className='py-[6em] bg-gradient-to-r from-[#2F2155] from-20% to-[#833FC2] to-100% text-white'>
            <div className="mx-auto flex h-[39.06rem] w-[96%] flex-col items-center rounded-[0.625rem] bg-[#20092D] p-[8em] text-center ">
                
                <h1 className="mb-[1.125rem] mt-0 w-full max-w-[37.5rem] text-[2.5em] font-bold">
                    Explore skills. Earn badges. Show your mastery.
                </h1>

                <p className="mb-[1.875rem] mt-0 w-full max-w-[31.875rem] text-[1.12em]">
                    Browse interesting skills, pass a quick test, and get a verified badge to prove your expertise.
                </p>

                <Link 
                    href="/create-account" 
                    className="inline-block cursor-pointer rounded-[0.625rem] border-none bg-[#5F28CD] px-[1.562rem] py-[0.625rem] text-[1.2rem] font-semibold transition-all duration-300 ease-in-out hover:bg-[#461b9c]"
                >
                    Start now →
                </Link>
            </div>    
        </div>
        
    );
}

export function SkillSection() {
    return (
        <div id="badges" className="mx-auto my-[2.5rem] h-[56.25rem] w-[96.5%] px-[5%] py-[6.875rem] md:px-[16.5%]">
            <h2 className="mb-[1.125rem] w-full max-w-[18.75rem] text-[2em] font-bold">
                Discover new possibilities
            </h2>

            <p className="mb-[5rem] w-full max-w-[23.75rem] text-[1.125rem]">
                Browse skills you're interested in and take a quiz to earn your digital badge.
            </p>

            <div className="h-[25rem] w-full rounded-[0.625rem] border border-solid border-white bg-gray-500/25"></div>
        </div>
    );
}

export function ResumeSection() {
    return (
        <div id="resume" className="bg-[#20092D] w-[96.5%] h-[96.875rem] my-[2.5rem] mx-auto py-[8.125rem] px-[16.5%] rounded-[0.625rem]">
            
            <h2 className="w-[18.75rem] text-[2em] font-bold mb-[1.125rem]">
                Build your resume with ease
            </h2>

            <p className="w-[26.25rem] text-[1.05em] mb-[5rem]">
                Select template, pick your earned badges and turn them into a professional resume in just a few clicks.
            </p>

            <div className="bg-[rgba(128,128,128,0.238)] border border-solid border-white rounded-[0.625rem] h-[62.5rem]">  
                {/*ไว้ใส่อนิเม*/}
            </div> 
        </div>
    );
};

export function CloseSection() {
    return (
        <div className="mx-auto my-[2.5rem] flex h-[35rem] w-[96.5%] flex-col items-center justify-center rounded-[0.625rem] p-[7.5rem] text-center">
            <h2 className="mb-[1.125rem] mt-0 text-[2.5rem] font-bold ">
                Ready to Level Up Your Profile?
            </h2>

            <p className="mb-[3.75rem] mt-0 w-full max-w-[31.875rem] text-[1.2rem]">
                Ready to build your profile? Join SkillANA and start showcasing your skills today.
            </p>

            <Link href="/create-account" className="inline-block rounded-[0.625rem] bg-[#5F28CD] px-[2.75rem] py-[1rem] text-[1.12rem] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#461b9c]">
                Get Started for Free →
            </Link>
        </div>
    );
}

export function Footer() {
  return (
    <>
      <div className="flex items-center justify-between w-[100%] h-auto bg-transparent border-t border-[#ffffff4d] mx-auto mb-[2em] py-[6em] ">
        
        {/* .leftSide */}
        <div className="flex flex-col gap-[20px] w-[300px] ml-[9em]">
          <h2 className="text-[24px] font-semibold ">SkillANA</h2>
          <p className="text-[14px] ">
            Simple, smart, and effective. SkillANA helps you organize your professional growth in one place.
          </p>
          <p className="inline self-start text-[14px] underline cursor-pointer hover:text-[#999999]">read more →</p>
        </div>

        {/* .rightSide */}
        <div className="grid grid-cols-4 relative right-[2.75em] w-[45%]">
          
          <div>
            <h4 className="mb-[1.5em] text-[18px] font-medium ">Product</h4>
            <ul className="list-none text-[15px] text-gray-300 ">
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Features
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Skills
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Resume
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[1.5em] text-[18px] font-medium">Resources</h4>
            <ul className="list-none text-[15px] text-gray-300 ">
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Guide
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Templates
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Community
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[1.5em] text-[18px] font-medium">Contact</h4>
            <ul className="list-none text-[15px] text-gray-300 ">
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Facebook
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Twitter
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Instagram
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-[1.5em] text-[18px] font-medium">Policies</h4>
            <ul className="list-none text-[15px] text-gray-300 ">
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Terms
              </li>
              <li className="mb-[15px] cursor-pointer transition-colors duration-300 hover:text-white">
                Privacy
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="mx-auto w-[90%] h-[1.5px] bg-[#ffffff4d] "></div>

      {/* .logo */}
      <div className="flex flex-col justify-center items-center gap-[8px] mt-[1.75em] mx-auto pb-[5em] ">
        <div className="relative w-[3.1em] h-[3.1em]">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain" 
          />
        </div>
        <p className="text-[13px] text-gray-200 ">©2026 SkillAna. All rights reserved.</p>
      </div>
    </>
  );
}