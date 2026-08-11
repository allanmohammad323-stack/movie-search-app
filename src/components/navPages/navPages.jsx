import styles from './navPages.module.css'
export default function NavPages({page, setPage}){
    return(
         <div className={styles.pagesNavlist}>
  {[...Array(5)].map((_, i) => (
    <button 
      className={`${styles.pageNumber} ${page === i + 1 ? styles.active : ''}`} 
      key={i + 1}
      onClick={() => setPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}
  <button className={styles.pageNumber}>&gt;</button>
</div>
    )
}