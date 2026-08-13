import styles from './content.module.css'
import Pagination from '../../pagination/pagination'
import Load from '../../load/load'
import NotFound from '../../notfound/notfound'
import MovieCard from '../../moviecard/moviecard'

export default function Content({
    moviesData,
    loading,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    setSearch,
    startPage,
    setStartPage
}) {
    const totalPages = Math.min(
        moviesData?.total_pages || 1,
        500
    )

    return (
        <div className={styles.contentContainer}>
            {loading ? (
                <Load />
            ) : moviesData?.results?.length > 0 ? (
                <>
                    {moviesData.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}

                    <div className={styles.pagesNavlist}>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                            startPage={startPage}
                            setStartPage={setStartPage}
                        />
                    </div>
                </>
            ) : (
                <NotFound
                    message={`No movies found With Name ${searchQuery || ''}`}
                    setSearchQuery={setSearchQuery}
                />
            )}
        </div>
    )
}