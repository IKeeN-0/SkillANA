import styles from "./page.module.css"
import {Navbar} from "@/app/_global_components/navbar/navbar";
import Main from "./components/main";
import { Params } from "next/dist/server/request/params";
export default async function Resume({params} : {params : Promise<{ id : string}>}){
    const data = await params
    const id = data.id
    return (<>
        <div className={styles.layoutWrapper}>
            <Navbar></Navbar>
            <main className = {styles.mainSection}>
            <Main id={Number(id)}></Main>
        </main>
        </div>
    </>)
}