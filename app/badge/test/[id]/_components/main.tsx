"use client"

import styles from "./main.module.css"
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
            const timer = setTimeout(() => {
                alert("Time for this section has ended. Please click 'OK' to submit.");
                handleSubmit();
            }, 100);
            
            return () => clearTimeout(timer);
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
    //-----------------------------------------------------------------------------------------
    return (
        <>
            <div className={styles.mainBg}>
                <main className={styles.mainBox}>
                        <section className={styles.timerBox}>
                            <h3 className={styles.timer}>{formatTime(timeLeft)}</h3>
                        </section>

                        <section className={styles.questionBox}>
                            <div className={styles.quesiton}>
                                <h3 style={{fontSize : "medium"}}>{currentQuestionIdx + 1}.</h3>
                                <h3 style={{fontSize : "medium", fontWeight : "600"}}>{currentQuestion?.question}</h3>
                            </div>
                            
                            <Choice text = {currentQuestion?.answers[0]} isSelected = {selectedAnswer == 0} 
                              onClick={() => handleChoice(0)}  >    
                            </Choice>
                            
                            <Choice text = {currentQuestion?.answers[1]} isSelected = {selectedAnswer == 1}
                              onClick={() => handleChoice(1)}  > 
                            </Choice>
                            
                            <Choice text = {currentQuestion?.answers[2]} isSelected = {selectedAnswer == 2}
                                onClick={() => handleChoice(2)}  >  
                            </Choice>
                            
                            <Choice text = {currentQuestion?.answers[3]} isSelected = {selectedAnswer == 3}
                                onClick={() => handleChoice(3)}  >  
                            </Choice>
                            
                            <section className={styles.dotBox}>
                                {questions.map((_, idx) =>(
                                    <Dot
                                        key={idx} 
                                        focus = {idx == currentQuestionIdx}
                                        done = {selectedIndices[idx] != -1}
                                        onClick={() => handleDot(idx)}
                                    ></Dot>
                                ))}
                            </section>
                        </section>

                        <section className = {styles.btnContainer}>

                            <div className={currentQuestionIdx == 0 ? styles.btnCnt: styles.btnNext} onClick={handleBack}>{"< Back"}</div>
                            <div className={currentQuestionIdx == questions.length - 1 ? styles.btnCnt: styles.btnNext} onClick={handleNext}>{"Next >"}</div>
                        </section>

                </main>

                {currentQuestionIdx == questions.length - 1 ? <div className={styles.submit} onClick={handleSubmit}>Submit</div> : "" }
            </div>
        </>
    )
}