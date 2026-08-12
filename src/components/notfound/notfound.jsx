import styles from './notfound.module.css'
import { Link } from 'react-router-dom'
export default function NotFound({ message ,setSearchQuery }) {
    return (
        <div className={styles.notFound}>
            <div className={styles.content}>
                <div className={styles.ghost}>
                    <div className={styles.ghostEyes}>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.ghostMouth}></div>
                </div>
                <h1 className={styles.errorCode}>
                    {message || "The page you're looking for seems to have vanished into thin air."}
                </h1>

                <button onClick={() => {setSearchQuery('')}} className={styles.homeButton}>
                    🏠 Go Back Home
                </button>
            </div>
        </div>
    )
}