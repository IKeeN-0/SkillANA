"use client"

import { useState, useEffect } from "react"
import Choice from "./choice";
import { useRouter } from 'next/navigation'
import Dot from "./dot";
import { jwtDecode } from "jwt-decode";

interface InputProps{
    id : string
}

interface QuesitonItem{
    _id : string,
    question: string,
    answers: string[],
    correctAnswer: string
}

interface BadgeItem{
    _id : string,
    badgeName : string,
    category : {
        categoryId : string,
        name : string,
    },
    imgUrl : string,
    description: string,
    criteria: {
        questionNum : number,
        timeLimit: string,
        passingScore: number
    },
    test:{
        questions: QuesitonItem[]
    }
}

export default function MainBox({id} : InputProps){
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [currentQuestionIdx, setCurrentQuesitonIdx] = useState(0);
    const [questions, setQuestions] = useState<QuesitonItem[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [passingScore, setPassingScore] = useState(0);
    const [badge, setBadge] = useState<BadgeItem>({} as BadgeItem)
    const [showTimeOutPopup, setShowTimeOutPopup] = useState(false);
    
    useEffect(() => {
        if(selectedIndices[currentQuestionIdx] != -1){
            setSelectedAnswer(selectedIndices[currentQuestionIdx]);
        }else setSelectedAnswer(null) // รีเซ็ตให้ยังไม่เลือกเมื่อเปลี่ยนข้อ
    }, [currentQuestionIdx]);
    
    useEffect(()=>{ // fetchTime
        const fetchData = async () => { //Get badge function
            const res = await fetch(`/api/badges/${id}`);
            const data = await res.json()
            setBadge(data.badge)
            const badgeQuestion = data.badge.test.questions
            if(badgeQuestion){
                setQuestions(badgeQuestion)
                const initialIndices = new Array(badgeQuestion.length).fill(-1);
                setSelectedIndices(initialIndices);
            }
            const initialSeconds : string = data.badge.criteria.timeLimit;
            const seconds : number = Number(initialSeconds.slice(0, 2)) * 60
            setTimeLeft(seconds);
            setPassingScore(data.badge.criteria.passingScore)
        };
        fetchData();

        localStorage.removeItem("score")
        localStorage.removeItem("total")
        localStorage.removeItem("timeRemaining")
        localStorage.removeItem("pass")
        localStorage.removeItem("imgUrl")
    },[]);
    
    useEffect(()=>{
        if (timeLeft === null || timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft !== null && timeLeft <= 0) {
        setShowTimeOutPopup(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        if(seconds <= 0) return "Timeout";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    if (timeLeft === null) return <div>Loading timer...</div>;

    const currentQuestion = questions[currentQuestionIdx];
    
    //----------------------------------------------------------------------------------------
    //Click Function
    
    const handleChoice = (idx : number)=>{
        setSelectedAnswer(idx);
        const newIndices = [...selectedIndices];
        newIndices[currentQuestionIdx] = idx; 
        setSelectedIndices(newIndices);
    }
    const handleNext = ()=>{
        if(currentQuestionIdx < questions.length - 1) setCurrentQuesitonIdx(currentQuestionIdx+1);
    };
    const handleBack = ()=>{
        if(currentQuestionIdx > 0) setCurrentQuesitonIdx(currentQuestionIdx-1);
    }
    const handleDot = (idx : number)=>{
        setCurrentQuesitonIdx(idx)
    }

    const handleSubmit = ()=>{
        // 1. ดึงเฉลยออกมาเป็น Array ของ string
        const correctAnswers = questions.map(q => q.correctAnswer);
        const score = correctAnswers.filter((val, idx) => val === questions[idx].answers[selectedIndices[idx]]).length;
        let pass = "0";
        if(score >= passingScore){ //If pass then update badge for user!
            pass = "1"
            const updateUserBadge = async ()=>{
                try{
                    const token = localStorage.getItem("token");
                    if(!token){ router.push("/login"); return}
                    const decodeToken = jwtDecode(token) as any;
                    const userId = decodeToken.id || decodeToken.sub || decodeToken._id;
                    const res = await fetch(`/api/users/${userId}/badge`,{
                        method : "POST",
                        body : JSON.stringify({
                            badgeId : badge._id,
                            badgeName : badge.badgeName,
                            imgUrl: badge.imgUrl
                        })
                    })
                    const data = await res.json();
                    console.log(data.message)
                }
                catch(err){
                    console.error(err)
                }
            }
            updateUserBadge();
        }
        
        localStorage.setItem("score",score.toString())
        localStorage.setItem("total",questions.length.toString())
        localStorage.setItem("timeRemaining",formatTime(timeLeft))
        localStorage.setItem("pass",pass)
        localStorage.setItem("imgUrl", badge.imgUrl)
        router.push("/badge/test/result")
    }

    const btnBaseClass = "no-underline text-[0.6em] py-3 px-6 font-semibold text-[0.9em] rounded-[10px] transition-all duration-200";
    const btnCntClass = `${btnBaseClass} bg-[#5F28CD] opacity-40`;
    const btnNextClass = `${btnBaseClass} bg-[#5F28CD] cursor-pointer hover:bg-[#3b0d98]`;
    
    return (
        <>
            <div className="w-full h-full flex mt-[4em] flex-col items-center">
                <main className="bg-[rgba(255,255,255,0.45)] w-[70%] h-[80%] rounded-[15px] flex flex-col items-center justify-around">
                        
                    <section className={`border-2 border-solid w-[15%] py-2 flex justify-center items-center rounded-[15px] transition-colors duration-300 ${
                        timeLeft !== null && timeLeft <= 60 && timeLeft > 0 
                        ? 'animate-blink' 
                        : 'border-white text-white'
                    }`}>
                        <h3 className="text-3xl font-semibold">{formatTime(timeLeft)}</h3>
                    </section>

                    <section className="w-[70%] max-h-[75%] flex flex-col gap-5">

                        <div className="flex gap-[.3em]">
                            <h3 className="text-[1em]">{currentQuestionIdx + 1}.</h3>
                            <h3 className="text-[1em] font-semibold">{currentQuestion?.question}</h3>
                        </div>
                        
                        <Choice text={currentQuestion?.answers[0]} isSelected={selectedAnswer == 0} 
                          onClick={() => handleChoice(0)}  >    
                        </Choice>
                        
                        <Choice text={currentQuestion?.answers[1]} isSelected={selectedAnswer == 1}
                          onClick={() => handleChoice(1)}  > 
                        </Choice>
                        
                        <Choice text={currentQuestion?.answers[2]} isSelected={selectedAnswer == 2}
                            onClick={() => handleChoice(2)}  >  
                        </Choice>
                            
                        <Choice text={currentQuestion?.answers[3]} isSelected={selectedAnswer == 3}
                            onClick={() => handleChoice(3)}  >  
                        </Choice>
                        
                        <section className="mx-auto flex gap-[1.5em]">
                            {questions.map((_, idx) =>(
                                <Dot
                                    key={idx} 
                                    focus={idx == currentQuestionIdx}
                                    done={selectedIndices[idx] != -1}
                                    onClick={() => handleDot(idx)}
                                ></Dot>
                                ))}
                            </section>
                        </section>

                        <section className="self-end flex gap-[1em] mr-[1.5em]">
                            <div className={currentQuestionIdx == 0 ? btnCntClass : btnNextClass} onClick={handleBack}>{"< Back"}</div>
                            <div className={currentQuestionIdx == questions.length - 1 ? btnCntClass : btnNextClass} onClick={handleNext}>{"Next >"}</div>
                        </section>

                </main>

                {currentQuestionIdx == questions.length - 1 ? (
                    <div 
                        className="mt-6 bg-[#ffffff] text-[#5F28CD] w-[20%] shadow-lg flex justify-center items-center py-[.9em] text-[1.2em] font-bold rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#5F28CD] hover:text-white" 
                        onClick={handleSubmit}
                    >
                        Submit
                    </div> 
                ) : ""}
            </div>

            {showTimeOutPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white text-black w-100 p-8 rounded-[20px] flex flex-col items-center shadow-2xl text-center transform transition-all scale-100 opacity-100">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-5">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
                    <p className="text-gray-600 mb-8 text-[1em] leading-relaxed">
                        Time for this section has ended. <br />
                        Please click <strong>'OK'</strong> to submit.
                    </p>
                    <button 
                        onClick={() => {
                            setShowTimeOutPopup(false);
                            handleSubmit();
                        }}
                        className="w-full bg-[#5F28CD] text-white py-3 rounded-[10px] font-bold text-[1.1em] hover:bg-[#4a1f9e] cursor-pointer transition-colors duration-200"
                    >
                        OK
                    </button>
                </div>
            </div>
        )}

        <style>{`
            @keyframes blinkRedWhite {
                0%, 100% { color: #ff4d4f; border-color: #ff4d4f; } /* สีแดง */
                50% { color: #ffffff; border-color: #ffffff; }     /* สีขาว */
            }
            .animate-blink {
                animation: blinkRedWhite 2s ease-in-out infinite;
            }
        `}</style>

        </>
    )
}