import styles from './pagination.module.css'

export default function Pagination({
    page,
    setPage,
    totalPages,
    startPage,
    setStartPage
}) {
    const numbersList = Array.from(
        {
            length: Math.min(
                5,
                totalPages - startPage + 1
            )
        },
        (_, index) => startPage + index
    )

    const handleNext5 = () => {
        const nextStart = startPage + 5

        if (nextStart <= totalPages) {
            setStartPage(nextStart)
        }
    }

    const handlePrevious5 = () => {
        setStartPage(Math.max(1, startPage - 5))
    }

    const handleNext50 = () => {
        setStartPage(
            Math.min(startPage + 50, totalPages)
        )
    }

    const handlePrevious50 = () => {
        setStartPage(
            Math.max(1, startPage - 50)
        )
    }

    return (
        <div className={styles.pagesPaginationlist}>

            {/* Previous 50 */}
            {startPage > 50 && (
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
                    className={`${styles.pageNumber} ${page === number ? styles.active : ''
                        }`}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}

            {/* Next 5 */}
            {startPage + 5 <= totalPages && (
                <button
                    className={`${styles.pageNumber} ${styles.backGroundColor}`}
                    onClick={handleNext5}
                >
                    &gt;
                </button>
            )}

            {/* Next 50 */}
            {startPage + 50 <= totalPages && (
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