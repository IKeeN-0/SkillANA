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

// ============================================================================
    //ฟังก์ชันการจัดการ IndexedDB ในรูปแบบของ Promise เพื่อไม่ให้บล็อก Main Thread
// ============================================================================
const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("QuizAppDB", 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains("quizProgress")) {
                db.createObjectStore("quizProgress", { keyPath: "badgeId" });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const saveProgressDB = async (badgeId: string, currentIdx: number, indices: number[], timeLeft: number | null) => {
    try {
        const db = await initDB();
        const transaction = db.transaction("quizProgress", "readwrite");
        const store = transaction.objectStore("quizProgress");
        store.put({
            badgeId,
            currentQuestionIdx: currentIdx,
            selectedIndices: indices,
            timeLeft: timeLeft
        });
    } catch (err) {
        console.error("IndexedDB Save Error:", err);
    }
};

const getProgressDB = async (badgeId: string): Promise<any> => {
    try {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("quizProgress", "readonly");
            const store = transaction.objectStore("quizProgress");
            const request = store.get(badgeId);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    } catch (err) {
        console.error("IndexedDB Fetch Error:", err);
        return null;
    }
};

const deleteProgressDB = async (badgeId: string) => {
    try {
        const db = await initDB();
        const transaction = db.transaction("quizProgress", "readwrite");
        const store = transaction.objectStore("quizProgress");
        store.delete(badgeId);
    } catch (err) {
        console.error("IndexedDB Delete Error:", err);
    }
};
// ============================================================================

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
        if(selectedIndices[currentQuestionIdx] !== undefined && selectedIndices[currentQuestionIdx] !== -1){
            setSelectedAnswer(selectedIndices[currentQuestionIdx]);
        }else setSelectedAnswer(null) 
    }, [currentQuestionIdx, selectedIndices]);
    
    useEffect(()=>{ 
        const fetchData = async () => { 
            const res = await fetch(`/api/badges/${id}`);
            const data = await res.json()
            setBadge(data.badge)
            const badgeQuestion = data.badge.test.questions
            
            // 2. CHECKPOINT: ตรวจสอบว่ามีข้อมูล State เดิมค้างอยู่ใน IndexedDB หรือไม่
            const savedProgress = await getProgressDB(id);

            if(badgeQuestion){
                setQuestions(badgeQuestion)
                
                if (savedProgress) {
                    // กู้ข้อมูลฟอร์มเดิมกลับมาทำงานต่อทันที
                    setSelectedIndices(savedProgress.selectedIndices);
                    setCurrentQuesitonIdx(savedProgress.currentQuestionIdx);
                    setTimeLeft(savedProgress.timeLeft);
                } else {
                    // หากไม่มีประวัติเก่า ให้เริ่มต้นระบบเก็บข้อมูลชุดใหม่
                    const initialIndices = new Array(badgeQuestion.length).fill(-1);
                    setSelectedIndices(initialIndices);
                    
                    const initialSeconds : string = data.badge.criteria.timeLimit;
                    const seconds : number = Number(initialSeconds.slice(0, 2)) * 60
                    setTimeLeft(seconds);
                }
            }
            setPassingScore(data.badge.criteria.passingScore)
        };
        fetchData();

        localStorage.removeItem("score")
        localStorage.removeItem("total")
        localStorage.removeItem("timeRemaining")
        localStorage.removeItem("pass")
        localStorage.removeItem("imgUrl")
    }, [id]);
    
    // 3. BACKGROUND WORKER: บันทึกสถานะลง IndexedDB ทุกครั้งที่มีการขยับเปลี่ยนตัวแปรผ่านแบบ Asynchronous
    useEffect(() => {
        if (id && questions.length > 0) {
            saveProgressDB(id, currentQuestionIdx, selectedIndices, timeLeft);
        }
    }, [currentQuestionIdx, selectedIndices, timeLeft, id, questions]);

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

    // 4. RACE CONDITION REPAIR: แปลงฟังก์ชันให้รองรับสถาปัตยกรรม Async เพื่อจัดลำดับ Network และล้าง IndexedDB หลังสอบเสร็จ
    const handleSubmit = async () => {
        const correctAnswers = questions.map(q => q.correctAnswer);
        const score = correctAnswers.filter((val, idx) => val === questions[idx].answers[selectedIndices[idx]]).length;
        let pass = "0";

        if(score >= passingScore){ 
            pass = "1"
            await updateUserBadge();
        }
        
        // ล้างข้อมูลความคืบหน้าออกจากคลังในเครื่องหลังจากกดยืนยันคำตอบสำเร็จเสร็จสิ้น
        await deleteProgressDB(id);

        localStorage.setItem("score", score.toString())
        localStorage.setItem("total", questions.length.toString())
        localStorage.setItem("timeRemaining", formatTime(timeLeft))
        localStorage.setItem("pass", pass)
        localStorage.setItem("imgUrl", badge.imgUrl)
        router.push("/badge/result")
    }

    const updateUserBadge = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token){ router.push("/login"); return }
            const decodeToken = jwtDecode(token) as any;
            const userId = decodeToken.id || decodeToken.sub || decodeToken._id;
            const res = await fetch(`/api/users/${userId}/badge`, {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    badgeId : badge._id,
                    badgeName : badge.badgeName,
                    imgUrl: badge.imgUrl
                })
            })
            const data = await res.json();
            console.log(data.message)
        } catch (err) {
            console.error("Network or authorization error in background transaction:", err)
        }
    }
    
    return (
        <>
            <div className="w-full h-full flex mt-[4em] flex-col items-center">
                <main className="bg-[rgba(255,255,255,0.45)] w-[70%] h-[80%] rounded-[15px] flex flex-col items-center justify-around">
                        
                    <section className={`border-2 border-solid w-[15%] py-2 mt-5 flex justify-center items-center rounded-[15px] transition-colors duration-300 ${
                        timeLeft !== null && timeLeft <= 60 && timeLeft > 0 
                        ? 'animate-blink' 
                        : 'border-white text-white'
                    }`}>
                        <h3 className="text-3xl font-semibold">{formatTime(timeLeft)}</h3>
                    </section>

                    <section className="w-[70%] max-h-[75%] flex flex-col gap-5">

                        <div className="flex gap-[.3em] h-15">
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

                    <section className="self-end flex gap-[1em] mr-[1.5em] pb-4">
                        
                        <button 
                            onClick={handleBack}
                            disabled={currentQuestionIdx === 0}
                            className={`py-2 px-6 font-semibold text-[1em] rounded-[10px] transition-all duration-200 ${
                                currentQuestionIdx === 0 
                                ? "opacity-0 pointer-events-none"
                                : "bg-[#9152bec5] text-purple-100 hover:border-[#5F28CD] hover:bg-purple-500/50 transition-colors cursor-pointer"
                            }`}
                        >
                            &lt; Back
                        </button>

                        {currentQuestionIdx === questions.length - 1 ? (
                            <button 
                                onClick={handleSubmit}
                                className="py-3 px-8 font-bold text-[1em] rounded-[10px] transition-all duration-200 bg-[#5F28CD] text-white hover:bg-[#4a1f9e] shadow-lg cursor-pointer"
                            >
                                Submit
                            </button>
                        ) : (
                            <button 
                                onClick={handleNext}
                                className="py-3 px-6 font-semibold text-[1em] rounded-[10px] transition-all duration-200 bg-[#5F28CD] text-white hover:bg-[#4a1f9e] shadow-md cursor-pointer"
                            >
                                Next &gt;
                            </button>
                        )}
                    </section>

                </main>
                
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
                    0%, 100% { color: #ff4d4f; border-color: #ff4d4f; }
                    50% { color: #ffffff; border-color: #ffffff; }
                }
                .animate-blink {
                    animation: blinkRedWhite 2s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}