import styles from './help.module.css';
import Link from 'next/link';

export function Help() {
  return (
    <div className={styles.helpSection}>
        <div className={styles.text}>
            <h1 className={styles.mainText}>
                Stuck on something?
            </h1>
            
            <div className={styles.subText}>
                We’ve got your back! Whether you’re stuck on a test or just getting started, our guide has all the answers.
            </div>

            <Link href='' className={styles.btn}>View Our Start Guide</Link>
        </div>
        <img src='/paper.png' className={styles.paper}></img>
        
    </div>
  );
};