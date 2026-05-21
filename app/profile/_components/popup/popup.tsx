'use client'
import { useEditContext } from "../edit";
import style from "./popup.module.css"

export default function Popup() {  
    const { isEdit, setEditing, saveData, reset, tempData } = useEditContext();

    if (!isEdit) return null;

    const isValid = tempData.firstName?.trim() !== "" && tempData.lastName?.trim() !== "";

    return (
        <>
            <div className={style.popupBar} onClick={() => setEditing(false)}>
                <div className={style.popupContent}>
                    <button className={style.resetButton} onClick={() => { setEditing(false); reset(); }}>
                        Cancel
                    </button>
                    <button 
                        className={`${style.saveButton} ${!isValid ? style.saveDisabled : ""}`}
                        onClick={() => { if (isValid) { setEditing(false); saveData(); } }}
                        disabled={!isValid}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    )
}