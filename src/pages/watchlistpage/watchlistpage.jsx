import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './watchlistpage.module.css';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load watchlist from localStorage on mount
    useEffect(() => {
        const loadWatchlist = () => {
            try {
                const savedWatchlist = localStorage.getItem('watchlist');
                if (savedWatchlist) {
                    const parsed = JSON.parse(savedWatchlist);
                    setWatchlist(Array.isArray(parsed) ? parsed : []);
                } else {
                    setWatchlist([]);
                }
            } catch (error) {
                console.error('Error loading watchlist:', error);
                setWatchlist([]);
            } finally {
                setLoading(false);
            }
        };

        loadWatchlist();
    }, []);

    // Save to localStorage whenever watchlist changes
    useEffect(() => {
        if (!loading) {
            try {
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
            } catch (error) {
                console.error('Error saving watchlist:', error);
            }
        }
    }, [watchlist, loading]);

    // Get movie IDs from watchlist
    const movieIds = useMemo(() => {
        return watchlist.map(item => item.id);
    }, [watchlist]);

    // Add movie to watchlist
    const addMovie = useCallback((movie) => {
        if (!movie || !movie.id) return;

        setWatchlist(prev => {
            // Check if movie already exists
            if (prev.some(item => item.id === movie.id)) {
                return prev;
            }
            return [...prev, { ...movie, addedAt: new Date().toISOString() }];
        });
    }, []);

    // Remove movie from watchlist
    const removeMovie = useCallback((movieId) => {
        setWatchlist(prev => prev.filter(item => item.id !== movieId));
    }, []);

    // Clear entire watchlist
    const clearWatchlist = useCallback(() => {
        if (window.confirm('Are you sure you want to clear your watchlist?')) {
            setWatchlist([]);
        }
    }, []);

    // Check if movie is in watchlist
    const isInWatchlist = useCallback((movieId) => {
        return watchlist.some(item => item.id === movieId);
    }, [watchlist]);

    // Get watchlist count
    const watchlistCount = useMemo(() => {
        return watchlist.length;
    }, [watchlist]);

    // Format date
    const formatDate = useCallback((dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Invalid date';
        }
    }, []);

    // Simulate fetching movie details (replace with actual API call)
    const fetchMovieDetails = useCallback(async (movieId) => {
        // This is a placeholder - replace with your actual API call
        // Example: const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`);
        // return await response.json();
        return { id: movieId, title: `Movie ${movieId}`, poster_path: null };
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loader}>Loading watchlist...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.glassCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>🎬 My Watchlist</h1>
                    <div className={styles.stats}>
                        <span className={styles.count}>{watchlistCount} movies</span>
                        {watchlistCount > 0 && (
                            <button 
                                className={styles.clearBtn}
                                onClick={clearWatchlist}
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {watchlistCount === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📭</div>
                        <h3>Your watchlist is empty</h3>
                        <p>Start adding movies you want to watch!</p>
                    </div>
                ) : (
                    <div className={styles.movieGrid}>
                        {watchlist.map((movie) => (
                            <div key={movie.id} className={styles.movieCard}>
                                <div className={styles.posterContainer}>
                                    {movie.poster_path ? (
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            className={styles.poster}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className={styles.noPoster}>No Image</div>
                                    )}
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeMovie(movie.id)}
                                        aria-label="Remove from watchlist"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className={styles.movieInfo}>
                                    <h3 className={styles.movieTitle}>{movie.title || 'Unknown Title'}</h3>
                                    {movie.release_date && (
                                        <p className={styles.releaseDate}>
                                            📅 {formatDate(movie.release_date)}
                                        </p>
                                    )}
                                    {movie.vote_average && (
                                        <p className={styles.rating}>
                                            ⭐ {movie.vote_average.toFixed(1)}/10
                                        </p>
                                    )}
                                    <p className={styles.addedDate}>
                                        Added: {formatDate(movie.addedAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchlistPage;