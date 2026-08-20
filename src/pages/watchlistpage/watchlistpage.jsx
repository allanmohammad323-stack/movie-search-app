import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './watchlistpage.module.css';
import {
    fetchWatchlistMovie,
    getTmdbErrorMessage
} from '../../sevices/fetchData/fetchData';
import MovieCard from '../../components/moviecard/moviecard';
import StarRating from '../../components/StarRating/StarRating';

const WatchlistPage = ({ watchlist, setWatchlist }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState(null);
    const [loadVersion, setLoadVersion] = useState(0);
    
    // Ratings state with localStorage persistence
    const [ratings, setRatings] = useState(() => {
        const saved = localStorage.getItem('movieRatings');
        return saved ? JSON.parse(saved) : {};
    });
    
    const fetchedIds = useRef(new Set());
    const movieCache = useRef(new Map());
    const prevWatchlistRef = useRef(watchlist);
    const isFetchingRef = useRef(false);

    // Save ratings to localStorage
    useEffect(() => {
        localStorage.setItem('movieRatings', JSON.stringify(ratings));
    }, [ratings]);

    const fetchSingleMovie = useCallback(async (id) => {
        if (movieCache.current.has(id)) {
            return movieCache.current.get(id);
        }
        
        try {
            const movie = await fetchWatchlistMovie(id);
            if (movie) {
                movieCache.current.set(id, movie);
                fetchedIds.current.add(id);
                return movie;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }, []);

    // Load initial watchlist
    useEffect(() => {
        const loadInitialMovies = async () => {
            if (watchlist.length === 0) {
                setMovies([]);
                setLoading(false);
                setInitialLoad(false);
                return;
            }

            setLoading(true);
            setInitialLoad(true);
            setError(null);

            try {
                const movieData = await Promise.all(
                    watchlist.map(id => fetchSingleMovie(id))
                );

                const validMovies = movieData.filter(movie => movie !== null);
                setMovies(validMovies);
            } catch (error) {
                console.error('Error fetching watchlist movies:', error);
                setError(getTmdbErrorMessage(error));
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        if (watchlist.length === 0) {
            setMovies([]);
            setLoading(false);
            setInitialLoad(false);
        } else if (movies.length === 0 && initialLoad) {
            loadInitialMovies();
        }
    }, [loadVersion]);

    // Handle watchlist changes
    useEffect(() => {
        if (initialLoad) return;
        if (isFetchingRef.current) return;
        
        const prev = prevWatchlistRef.current;
        const hasChanged = prev.length !== watchlist.length || 
            prev.some((id, index) => id !== watchlist[index]);
        
        if (!hasChanged) {
            return;
        }

        prevWatchlistRef.current = [...watchlist];

        if (watchlist.length === 0) {
            setMovies([]);
            setLoading(false);
            return;
        }

        const currentMovieIds = new Set(movies.map(m => m.id));
        const newIds = watchlist.filter(id => !currentMovieIds.has(id));
        
        const movieIds = new Set(watchlist);
        const removedMovies = movies.filter(m => !movieIds.has(m.id));
        
        if (newIds.length === 0 && removedMovies.length === 0) {
            return;
        }

        const fetchNewMovies = async () => {
            isFetchingRef.current = true;
            setLoading(true);
            
            try {
                const newMoviesData = await Promise.all(
                    newIds.map(id => fetchSingleMovie(id))
                );
                
                const validNewMovies = newMoviesData.filter(m => m !== null);
                const existingMovies = movies.filter(m => watchlist.includes(m.id));
                const updatedMovies = [...existingMovies, ...validNewMovies];
                
                const sortedMovies = watchlist
                    .map(id => updatedMovies.find(m => m?.id === id))
                    .filter(m => m !== undefined);
                
                setMovies(sortedMovies);
            } catch (error) {
                console.error('Error fetching new movies:', error);
                setError(getTmdbErrorMessage(error));
            } finally {
                setLoading(false);
                isFetchingRef.current = false;
            }
        };

        fetchNewMovies();
    }, [watchlist, initialLoad, fetchSingleMovie, movies]);

    const retryLoading = useCallback(() => {
        setError(null);
        setMovies([]);
        setInitialLoad(true);
        setLoadVersion(version => version + 1);
    }, []);

    const handleRate = useCallback((movieId, rating) => {
        setRatings(prev => ({
            ...prev,
            [movieId]: rating
        }));
    }, []);

    const getRating = useCallback((movieId) => {
        return ratings[movieId] || 0;
    }, [ratings]);

    const removeMovie = useCallback((movieId) => {
        setWatchlist(prev => {
            const newList = prev.filter(id => id !== movieId);
            prevWatchlistRef.current = newList;
            return newList;
        });
        setMovies(prev => prev.filter(movie => movie.id !== movieId));
        setRatings(prev => {
            const newRatings = { ...prev };
            delete newRatings[movieId];
            return newRatings;
        });
    }, [setWatchlist]);

    const clearWatchlist = useCallback(() => {
        setWatchlist([]);
        setMovies([]);
        prevWatchlistRef.current = [];
        movieCache.current.clear();
        fetchedIds.current.clear();
        setRatings({});
    }, [setWatchlist]);

    const formatDate = useCallback((date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString(
            'en-US',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        );
    }, []);

    const watchlistCount = watchlist.length;

    return (
        <div className={styles.container}>
            <div className={styles.glassCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        🎬 My Watchlist
                    </h1>

                    <div className={styles.stats}>
                        <span className={styles.count}>
                            {watchlistCount} {watchlistCount === 1 ? 'movie' : 'movies'}
                        </span>

                        {watchlistCount > 0 && (
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={clearWatchlist}
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {error ? (
                    <div className={styles.emptyState} role="alert">
                        <div className={styles.emptyIcon}>!</div>
                        <h3>{error}</h3>
                        <button
                            type="button"
                            className={styles.clearBtn}
                            onClick={retryLoading}
                        >
                            Try again
                        </button>
                    </div>
                ) : loading ? (
                    <div className={styles.emptyState}>
                        <div className={styles.loadingSpinner}>⏳</div>
                        <h3>Loading watchlist...</h3>
                    </div>
                ) : watchlistCount === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📭</div>
                        <h3>Your watchlist is empty</h3>
                        <p>Start adding movies you want to watch!</p>
                    </div>
                ) : (
                    <div className={styles.movieGrid}>
                        {movies.map(movie => (
                            <div key={movie.id} className={styles.movieCardWrapper}>
                                <MovieCard movie={movie} />
                                
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

                                <button
                                    type="button"
                                    className={styles.removeBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeMovie(movie.id);
                                    }}
                                    aria-label="Remove from watchlist"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchlistPage;