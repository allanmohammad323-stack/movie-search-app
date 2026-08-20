import styles from './content.module.css'
import Pagination from '../../pagination/pagination'
import Loading from '../../loading/loading'
import NotFound from '../../notfound/notfound'
import MovieCard from '../../moviecard/moviecard'

export default function Content({
    moviesData,
    loading,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    error,
    onRetry,
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
            {error ? (
                <NotFound
                    message={error}
                    onRetry={onRetry}
                    retryLabel="Try again"
                />
            ) : loading ? (
                <Loading />
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