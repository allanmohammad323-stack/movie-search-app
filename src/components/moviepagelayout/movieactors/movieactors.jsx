import styles from './movieactors.module.css'
import ActorCard from './actorcard/actorcard'
import { useRef } from 'react'

function MovieActors({ actors }) {
    const scrollContainerRef = useRef(null)

    const scroll = (direction) => {
        const container = scrollContainerRef.current

        if (!container) return

        const scrollAmount =
            direction === 'left'
                ? -container.offsetWidth * 0.6
                : container.offsetWidth * 0.6

        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        })
    }

    return (
        <div className={styles.movieActorsWrapper}>

            <div className={styles.sectionHeader}>

                <h3 className={styles.sectionTitle}>
                    <span className={styles.titleIcon}>
                        🎭
                    </span>

                    Cast
                </h3>

                <div className={styles.scrollControls}>

                    <button
                        className={styles.scrollButton}
                        onClick={() => scroll('left')}
                    >
                        ‹
                    </button>

                    <button
                        className={styles.scrollButton}
                        onClick={() => scroll('right')}
                    >
                        ›
                    </button>

                </div>

            </div>


            <div
                className={styles.scrollContainer}
                ref={scrollContainerRef}
            >

                <div className={styles.actorsGrid}>

                    {actors.map((actor, index) => (
                        <ActorCard
                            key={`actor-${actor.id}-${index}`}
                            actor={actor}
                        />
                    ))}

                </div>

            </div>

        </div>
    )
}

export default MovieActors