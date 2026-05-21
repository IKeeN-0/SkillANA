import {Navbar} from "@/app/_global_components/navbar/navbar";
import styles from './layout.module.css';
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className={styles.layoutWrapper}>
        <Navbar></Navbar>
        {children}
    </div>
    </>
  );
}