import styles from './content.module.css'
import { useEffect, useState, useRef } from 'react'
import { fetchData } from '../../../sevices/fetchData/fetchData'
import NavPages from '../../navPages/navPages'
import Load from '../../load/load'

export default function Content() {

    const [moviesData, setMoviesData] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const cache = useRef({});

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            if (cache.current[page]) {
                setMoviesData(cache.current[page]);
                setLoading(false);
                return;
            }

            const data = await fetchData(page);

            cache.current[page] = data;
            setMoviesData(data);
            setLoading(false)
        };
        getData();
    }, [page]);



    return (

        <div className={styles.contentContainer}>
            {loading ? <Load /> : 
            moviesData && moviesData.results.map((movie) => (
                <div className={styles.movieCard} key={movie.id}>
                <p className={styles.rating}>{movie.vote_average.toFixed(1)}</p>
                <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h2 className={styles.title}>{movie.title}</h2>
                </div>
            )) }
            
            
            <div className={styles.pagesNavlist}>
                <NavPages page={page} setPage={setPage} />
            </div>
        </div>

    )
}