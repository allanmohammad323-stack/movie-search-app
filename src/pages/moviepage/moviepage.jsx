import styles from './moviepage.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import {
    fetchMovie,
    getTmdbErrorMessage
} from '../../sevices/fetchData/fetchData'

import React, {
    Suspense,
    useEffect,
    useState,
    useCallback
} from 'react'

import MovieCard from '../../components/moviecard/moviecard'
import Loading from '../../components/loading/loading'
import NotFound from '../../components/notfound/notfound'
import StarRating from '../../components/StarRating/StarRating' // Add this import

const Media = React.lazy(() => import('../../components/media/media'))
const MovieActors = React.lazy(() =>
    import('../../components/moviepagelayout/movieactors/movieactors')
)

function MoviePage({
    watchlisthandler,
    watchlist,
    favoriteHandler,
    favorites
}) {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const [showTrailer, setShowTrailer] = useState(false)
    
    // Add ratings state with localStorage persistence
    const [ratings, setRatings] = useState(() => {
        const saved = localStorage.getItem('movieRatings');
        return saved ? JSON.parse(saved) : {};
    });

    // Save ratings to localStorage
    useEffect(() => {
        localStorage.setItem('movieRatings', JSON.stringify(ratings));
    }, [ratings]);

    // Handle rating a movie
    const handleRate = useCallback((movieId, rating) => {
        setRatings(prev => ({
            ...prev,
            [movieId]: rating
        }));
    }, []);

    // Get rating for a movie
    const getRating = useCallback((movieId) => {
        return ratings[movieId] || 0;
    }, [ratings]);

    useEffect(() => {
        const controller = new AbortController()

        window.scrollTo(0, 0);

        setLoading(true)
        setMovie(null)
        setError(null)

        fetchMovie(id, controller.signal)
            .then((data) => {
                console.log('MOVIE:', data)
                setMovie(data)
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    console.error('Error fetching movie:', error)
                    setMovie(null)
                    setError(getTmdbErrorMessage(error))
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            })

        return () => controller.abort()
    }, [id, retryCount])

    // Navigate to movie detail page
    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`)
    }

    if (loading) {
        return <Loading />
    }

    if (!movie) {
        return (
            <NotFound
                message={error || `No movies found With ID ${id}`}
                onRetry={error ? () => setRetryCount(count => count + 1) : undefined}
                retryLabel={error ? 'Try again' : undefined}
            />
        )
    }

    const director =
        movie.credits?.crew?.find(
            person => person.job === 'Director'
        )?.name || 'N/A'

    const trailer =
        movie.videos?.results?.find(
            video =>
                video.type === 'Trailer' &&
                video.site === 'YouTube'
        ) ||
        movie.videos?.results?.find(
            video => video.site === 'YouTube'
        )

    return (
        <>
            <div className={styles.moviePage}>
                <div className={styles.movieContent}>
                    {/* TOP SECTION - POSTER + MOVIE DETAILS */}
                    <div className={styles.movieLayout}>
                     {/* POSTER + USER RATING */}
<div className={styles.posterColumn}>

    {/* MOVIE CARD */}
    <div className={styles.movieCardWrapper}>
        <MovieCard movie={movie} />
    </div>

    {/* USER RATING UNDER MOVIE CARD */}
    <div className={styles.ratingContainer}>
        <StarRating
            initialRating={getRating(movie.id)}
            onRate={handleRate}
            movieId={movie.id}
            totalStars={5}
            size="medium"
        />

        <span className={styles.ratingLabel}>
            {getRating(movie.id) > 0
                ? `${getRating(movie.id)}/5`
                : 'Rate this movie'}
        </span>
    </div>

</div>

                        {/* MOVIE DETAILS */}
                        <div className={styles.movieDetails}>
                            <h2 className={styles.detailsTitle}>
                                About the Movie
                            </h2>

                            {/* DETAILS GRID */}
                            <div className={styles.detailsGrid}>
                                {/* Release Date */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Release Date
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.release_date
                                            ? new Date(
                                                movie.release_date
                                            ).toLocaleDateString(
                                                'en-US',
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }
                                            )
                                            : 'N/A'
                                        }
                                    </span>
                                </div>

                                {/* Runtime */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Runtime
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.runtime
                                            ? `${movie.runtime} min`
                                            : 'N/A'
                                        }
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Rating
                                    </span>
                                    <span className={styles.detailValue}>
                                        {typeof movie.vote_average === 'number' ? (
                                            <span className={styles.rating}>
                                                ⭐{' '}
                                                {movie.vote_average.toFixed(1)}
                                                {' / 10'}
                                                <span
                                                    className={
                                                        styles.voteCount
                                                    }
                                                >
                                                    (
                                                    {movie.vote_count?.toLocaleString() || 0}
                                                    {' '}votes)
                                                </span>
                                            </span>
                                        ) : (
                                            'N/A'
                                        )}
                                    </span>
                                </div>

                                {/* Genres */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Genres
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.genres?.length > 0 ? (
                                            <div className={styles.genres}>
                                                {movie.genres.map(
                                                    (genre, index) => (
                                                        <span
                                                            key={`genre-${genre.id}-${index}`}
                                                            className={
                                                                styles.genreTag
                                                            }
                                                        >
                                                            {genre.name}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            'N/A'
                                        )}
                                    </span>
                                </div>

                                {/* Director */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Director
                                    </span>
                                    <span className={styles.detailValue}>
                                        {director}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Status
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.status || 'N/A'}
                                    </span>
                                </div>

                                {/* Production */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Production
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.production_companies?.length > 0 ? (
                                            <div
                                                className={
                                                    styles.productionCompanies
                                                }
                                            >
                                                {movie.production_companies
                                                    .slice(0, 3)
                                                    .map(
                                                        (company, index) => (
                                                            <span
                                                                key={`company-${company.id}-${index}`}
                                                                className={
                                                                    styles.companyName
                                                                }
                                                            >
                                                                {company.name}
                                                            </span>
                                                        )
                                                    )}
                                                {movie.production_companies.length > 3 && (
                                                    <span
                                                        className={
                                                            styles.moreCompanies
                                                        }
                                                    >
                                                        +
                                                        {movie.production_companies.length - 3}
                                                        {' '}more
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            'N/A'
                                        )}
                                    </span>
                                </div>

                                {/* Budget */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Budget
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.budget
                                            ? `$${movie.budget.toLocaleString()}`
                                            : 'N/A'
                                        }
                                    </span>
                                </div>

                                {/* Revenue */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Revenue
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.revenue
                                            ? `$${movie.revenue.toLocaleString()}`
                                            : 'N/A'
                                        }
                                    </span>
                                </div>

                                {/* Original Language */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Original Language
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.original_language
                                            ?.toUpperCase() || 'N/A'
                                        }
                                    </span>
                                </div>

                                {/* Original Title */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Original Title
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.original_title || 'N/A'}
                                    </span>
                                </div>

                                {/* Collection */}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Collection
                                    </span>
                                    <span className={styles.detailValue}>
                                        {movie.belongs_to_collection?.name ||
                                            'N/A'
                                        }
                                    </span>
                                </div>

                                {/* Homepage */}
                                {movie.homepage && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>
                                            Website
                                        </span>
                                        <span className={styles.detailValue}>
                                            <a
                                                href={movie.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Visit Homepage
                                            </a>
                                        </span>
                                    </div>
                                )}

                                {/* IMDB */}
                                {movie.imdb_id && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>
                                            IMDB
                                        </span>
                                        <span className={styles.detailValue}>
                                            <a
                                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View on IMDB
                                            </a>
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* OVERVIEW */}
                            {movie.overview && (
                                <div className={styles.overview}>
                                    <h3 className={styles.overviewTitle}>
                                        Synopsis
                                    </h3>
                                    <p className={styles.overviewText}>
                                        {movie.overview}
                                    </p>
                                </div>
                            )}

                            {/* TAGLINE */}
                            {movie.tagline && (
                                <div className={styles.tagline}>
                                    <em>
                                        "{movie.tagline}"
                                    </em>
                                </div>
                            )}

                            {/* ACTION BUTTONS */}
                            <div className={styles.actionButtons}>
                                {trailer && (
                                    <button
                                        className={styles.trailerButton}
                                        onClick={() => setShowTrailer(true)}
                                    >
                                        ▶ Trailer
                                    </button>
                                )}
                                <button
                                    className={styles.watchlistButton}
                                    onClick={() => watchlisthandler(movie)}
                                >
                                    {watchlist?.includes(movie?.id) ? '✓ In Watchlist' : '+ Watchlist'}
                                </button>
                                <button
                                    className={styles.favoriteButton}
                                    onClick={() => favoriteHandler(movie)}
                                    aria-pressed={favorites?.includes(movie.id)}
                                >
                                    {favorites?.includes(movie.id)
                                        ? '♥ Favorited'
                                        : '♡ Favorite'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FULL WIDTH CONTENT */}
                    <div className={styles.fullWidthContent}>
                        {/* MEDIA */}
                        <section className={styles.mediaSection}>
                            <h2 className={styles.sectionTitle}>
                                Media
                            </h2>
                            <Suspense fallback={<Loading />}>
                                <Media mediaData={movie} />
                            </Suspense>
                        </section>

                        {/* CAST */}
                        <section className={styles.actorsSection}>
                            <h2 className={styles.sectionTitle}>
                                Cast
                            </h2>
                            <Suspense
                                fallback={<Loading />}
                            >
                                <MovieActors
                                    actors={
                                        movie.credits?.cast || []
                                    }
                                />
                            </Suspense>
                        </section>

                        {/* CREW */}
                        <section className={styles.crewSection}>
                            <h2 className={styles.sectionTitle}>
                                Crew
                            </h2>
                            <div className={styles.crewList}>
                                {movie.credits?.crew
                                    ?.slice(0, 10)
                                    .map((person, index) => (
                                        <div
                                            key={`crew-${person.id}-${index}`}
                                            className={styles.crewItem}
                                        >
                                            <span
                                                className={
                                                    styles.crewName
                                                }
                                            >
                                                {person.name}
                                            </span>
                                            <span
                                                className={
                                                    styles.crewJob
                                                }
                                            >
                                                {person.job}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </section>

                        {/* SIMILAR MOVIES */}
                        {movie.similar?.results?.length > 0 && (
                            <section className={styles.similarMovies}>
                                <h2 className={styles.sectionTitle}>
                                    Similar Movies
                                </h2>
                                <div className={styles.similarGrid}>
                                    {movie.similar.results
                                        .slice(0, 6)
                                        .map((similarMovie) => (
                                            <div
                                                key={`similar-${similarMovie.id}`}
                                                className={styles.similarCard}
                                                onClick={() => handleMovieClick(similarMovie.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <MovieCard movie={similarMovie} />
                                            </div>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* RECOMMENDATIONS */}
                        {movie.recommendations?.results?.length > 0 && (
                            <section className={styles.recommendations}>
                                <h2 className={styles.sectionTitle}>
                                    Recommendations
                                </h2>
                                <div className={styles.recommendationsGrid}>
                                    {movie.recommendations.results
                                        .slice(0, 6)
                                        .map((movieItem) => (
                                            <div
                                                key={`recommendation-${movieItem.id}`}
                                                className={styles.recommendationCard}
                                                onClick={() => handleMovieClick(movieItem.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <MovieCard movie={movieItem} />
                                            </div>
                                        ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
            
            {showTrailer && trailer && (
                <div
                    className={styles.trailerOverlay}
                    onClick={() => setShowTrailer(false)}
                >
                    <div
                        className={styles.trailerModal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeTrailer}
                            onClick={() => setShowTrailer(false)}
                        >
                            ✕
                        </button>

                        <div className={styles.trailerVideoWrapper}>
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                title={`${movie.title} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MoviePage