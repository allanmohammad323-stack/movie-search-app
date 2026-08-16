import styles from './actorcard.module.css'

function ActorCard({ actor }) {
      const imageUrl = actor.profile_path 
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        : null;
    return (
        <div className={styles.actorCard}>
            <div className={styles.actorImage}>
                <img src={imageUrl} alt={actor.name} loading="lazy" />
            </div>
            <div className={styles.actorInfo}>
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
            </div>
        </div>
    )
}

export default ActorCard