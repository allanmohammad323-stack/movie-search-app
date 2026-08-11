import styles from './load.module.css';

export default function Load() {
    return (
        <div className={styles.loadContainer}>
            <svg className={styles.svgSpinner} viewBox="0 0 50 50">
                <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
            <h1>Loading...</h1>
        </div>
    );
}