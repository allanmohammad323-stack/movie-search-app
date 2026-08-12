import styles from './pagination.module.css'

export default function Pagination({ page, setPage, totalPages }) {

    // Keep pages in groups of 5
    const startPage = Math.floor((page - 1) / 5) * 5 + 1

    const numbersList = Array.from(
        { length: Math.min(5, totalPages - startPage + 1) },
        (_, index) => startPage + index
    )

    // Move to next group
    const handleNext5 = () => {
        const nextPage = startPage + 5

        if (nextPage <= totalPages) {
            setPage(nextPage)
        }
    }

    // Move to previous group
    const handlePrevious5 = () => {
        const previousPage = Math.max(1, startPage - 5)

        setPage(previousPage)
    }

    // Move forward 50 pages
    const handleNext50 = () => {
        const nextPage = Math.min(startPage + 50, totalPages)

        setPage(nextPage)
    }

    // Move backward 50 pages
    const handlePrevious50 = () => {
        const previousPage = Math.max(1, startPage - 50)

        setPage(previousPage)
    }

    return (
        <div className={styles.pagesPaginationlist}>

            {/* Previous 50 */}
            {startPage > 1 && (
                <button
                    className={`${styles.pageNumber} ${styles.backGroundColor}`}
                    onClick={handlePrevious50}
                >
                    &lt;&lt;
                </button>
            )}

            {/* Previous 5 */}
            {startPage > 1 && (
                <button
                    className={`${styles.pageNumber} ${styles.backGroundColor}`}
                    onClick={handlePrevious5}
                >
                    &lt;
                </button>
            )}

            {/* Page numbers */}
            {numbersList.map((number) => (
                <button
                    key={number}
                    className={`${styles.pageNumber} ${
                        page === number ? styles.active : ''
                    }`}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}

            {/* Next 5 */}
            {startPage + 4 < totalPages && (
                <button
                    className={`${styles.pageNumber} ${styles.backGroundColor}`}
                    onClick={handleNext5}
                >
                    &gt;
                </button>
            )}

            {/* Next 50 */}
            {startPage + 49 < totalPages && (
                <button
                    className={`${styles.pageNumber} ${styles.backGroundColor}`}
                    onClick={handleNext50}
                >
                    &gt;&gt;
                </button>
            )}

        </div>
    )
}