import styles from './content.module.css'
import Pagination from '../../pagination/pagination'
import Load from '../../load/load'
import NotFound from '../../notfound/notfound'

export default function Content({
    moviesData,
    loading,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    setSearch
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
                        <div
                            className={styles.movieCard}
                            key={movie.id}
                        >
                            <p className={styles.rating}>
                                {movie.vote_average.toFixed(1)}
                            </p>

                            <img
                                className={styles.poster}
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />

                            <h2 className={styles.title}>
                                {movie.title}
                            </h2>
                        </div>
                    ))}

                    <div className={styles.pagesNavlist}>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
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