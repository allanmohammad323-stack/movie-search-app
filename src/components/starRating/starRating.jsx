import React, { useState, useEffect } from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ 
    initialRating = 0, 
    onRate, 
    movieId, 
    totalStars = 5 
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    return (
        <div className={styles.starRating}>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isActive = starValue <= (hover || rating);
                
                return (
                    <button
                        key={index}
                        type="button"
                        className={`${styles.starButton} ${isActive ? styles.active : ''}`}
                        onClick={() => {
                            setRating(starValue);
                            onRate(movieId, starValue);
                        }}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`Rate ${starValue} stars`}
                    >
                        {isActive ? '⭐' : '☆'}
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;