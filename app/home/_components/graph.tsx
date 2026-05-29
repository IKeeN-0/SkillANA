import React from 'react';

export function ProgressStats() {
  // 1. จำลองข้อมูล (สามารถนำข้อมูลจาก Database มาแทนที่ได้เลย)
  const stats = {
    badgesEarned: 12,
    quizzesPassed: 15,
    winRate: 75, // เปอร์เซ็นต์การสอบผ่าน (15 จาก 20 ควิซ)
  };

  // 2. ข้อมูลความถนัด (เพื่อเอาไปทำแถบสี)
  const skillsBreakdown = [
    { name: "Frontend", percentage: 60, color: "bg-[#dfa8ff]", shadow: "shadow-[0_0_10px_#dfa8ff]" },
    { name: "Backend", percentage: 25, color: "bg-[#5F28CD]", shadow: "shadow-[0_0_10px_#5F28CD]" },
    { name: "Database", percentage: 15, color: "bg-blue-500", shadow: "shadow-[0_0_10px_#3b82f6]" },
  ];

  // คำนวณเส้นรอบวงของกราฟโดนัท (2 * π * r) -> r=36 จะได้ประมาณ 226
  const circumference = 226;
  const strokeDashoffset = circumference - (circumference * stats.winRate) / 100;

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      
      {/* หัวข้อ */}
      <h2 className="text-2xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Your Progress & Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* =====================================
            กล่องที่ 1: Total Badges
        ===================================== */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#dfa8ff]/40 transition-all duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#dfa8ff] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
          <div className="relative z-10 text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[#dfa8ff] drop-shadow-lg">
            {stats.badgesEarned}
          </div>
          <div className="relative z-10 text-white/70 mt-2 font-medium tracking-wider uppercase text-sm">
            Badges Earned
          </div>
        </div>

        {/* =====================================
            กล่องที่ 2: Quizzes Passed
        ===================================== */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#dfa8ff]/40 transition-all duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#5F28CD] blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-300 rounded-full" />
          <div className="relative z-10 text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[#dfa8ff] drop-shadow-lg">
            {stats.quizzesPassed}
          </div>
          <div className="relative z-10 text-white/70 mt-2 font-medium tracking-wider uppercase text-sm">
            Quizzes Passed
          </div>
        </div>

        {/* =====================================
            กล่องที่ 3: กราฟโดนัท (Win Rate)
        ===================================== */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex items-center justify-between group hover:border-[#dfa8ff]/40 transition-all duration-300">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Win Rate</h3>
            <p className="text-white/50 text-sm font-medium leading-relaxed max-w-[120px]">
              You passed {stats.quizzesPassed} quizzes successfully.
            </p>
          </div>
          
          {/* สร้างกราฟโดนัทด้วย SVG */}
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(223,168,255,0.4)]">
              {/* เส้นวงหลัง (สีเทาจาง) */}
              <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/10" />
              {/* เส้นเปอร์เซ็นต์ (สีม่วงสว่าง) */}
              <circle 
                cx="48" cy="48" r="36" 
                stroke="currentColor" strokeWidth="10" fill="transparent" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round"
                className="text-[#dfa8ff] transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">
              {stats.winRate}%
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          ส่วนล่าง: แถบสีความถนัด (Skill Breakdown)
      ===================================== */}
      <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:border-[#dfa8ff]/40">
        <h3 className="text-xl font-bold text-white mb-6">Skill Breakdown</h3>
        
        {/* แถบ Progress Bar แบบแบ่งสี (Stacked) */}
        <div className="h-6 w-full flex rounded-full overflow-hidden mb-6 bg-white/10 shadow-inner">
          {skillsBreakdown.map((skill) => (
            <div 
              key={skill.name} 
              style={{ width: `${skill.percentage}%` }} 
              className={`h-full ${skill.color} transition-all duration-500 ease-out hover:opacity-80 relative group/bar cursor-pointer`}
              title={`${skill.name}: ${skill.percentage}%`}
            >
                {/* แสง Glow วิ่งตอน Hover ในแต่ละสี */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover/bar:opacity-20 transition-opacity" />
            </div>
          ))}
        </div>

        {/* จุด Legend อธิบายสี */}
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {skillsBreakdown.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${skill.color} ${skill.shadow}`}></div>
              <span className="text-white/80 text-md font-semibold">
                {skill.name} <span className="text-white/50 ml-1">({skill.percentage}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}