import styles from './moviecard.module.css'
import { useNavigate } from 'react-router-dom'
export default function MovieCard({ movie }) {
    // Fallback for movies without poster
    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : 'https://via.placeholder.com/342x513/1a1a2e/ffffff?text=No+Image'
    
    const navigate = useNavigate()

    return (
        <div className={styles.movieCard} onClick={() => navigate(`/movie/${movie.id}`)}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.poster}
                    src={posterUrl}
                    alt={movie.title}
                    loading="lazy"
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