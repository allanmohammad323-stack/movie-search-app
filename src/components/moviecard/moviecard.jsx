import React from 'react'
import styles from './moviecard.module.css'
import { useNavigate } from 'react-router-dom'

const fallbackPoster = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22342%22 height=%22513%22 viewBox=%220 0 342 513%22%3E%3Crect width=%22342%22 height=%22513%22 fill=%22%231a1a2e%22/%3E%3Ctext x=%22171%22 y=%22256%22 fill=%22%23ffffff%22 font-family=%22sans-serif%22 font-size=%2224%22 text-anchor=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E'

function MovieCard({ movie }) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : fallbackPoster
    
    const navigate = useNavigate()

    return (
        <div className={styles.movieCard} onClick={() => navigate(`/movie/${movie.id}`)}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.poster}
                    src={posterUrl}
                    alt={movie.title}
                    onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = fallbackPoster
                    }}
                    loading="lazy"
                    decoding="async"
                    width="342"
                    height="513"
                />
                <div className={styles.ratingBadge}>
                    ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                </div>
            </div>

            <h2 className={styles.title}>
                {movie.title}
            </h2>
        </div>
    )
}

export default React.memo(MovieCard)