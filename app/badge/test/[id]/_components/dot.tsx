import { Slabo_13px } from "next/font/google"
import styles from "./dot.module.css"

interface InputProps{
    focus : boolean,
    done : boolean
    onClick : ()=> void;
}

export default function Dot({focus, done, onClick} : InputProps){
    return (
        <div onClick={onClick}
        className= {`${styles.dot} ${focus ? styles.dotFocus : " "} ${done ? styles.done : ""}`}></div>
    )
}