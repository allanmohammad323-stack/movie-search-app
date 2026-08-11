import styles from './navPages.module.css'
import { useState } from 'react'
export default function NavPages({ page, setPage, totalPages }) {
  const [numbersList,setNumbersList]=useState([1,2,3,4,5])
  return (
    <div className={styles.pagesNavlist}>
            {numbersList[0] > 1 && <button className={`${styles.pageNumber} ${styles.backGroundColor}`}
            onClick={() => setNumbersList(numbersList.map((number) => number - 5))}
            >&lt;</button>}

      {numbersList.map((number) => (
        <button
        className={`${styles.pageNumber} ${page === number ? styles.active : ''}`}
          key={number}
          onClick={() => setPage(number)}
          >
          {number}
        </button>
      ))}
           {

             numbersList[numbersList.length - 1] < totalPages && <button className={`${styles.pageNumber} ${styles.backGroundColor}`}
            onClick={() => setNumbersList(numbersList.map((number) => number + 5))}
            >&gt;</button>
           } 

    </div>
  )
}