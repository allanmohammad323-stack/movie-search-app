// HomePage.jsx
import Header from '../../components/layout/header/header.jsx'
import Footer from '../../components/layout/footer/footer.jsx'
import Content from '../../components/layout/content/content.jsx'
import styles from './homepage.module.css'

import { useEffect, useState, useRef } from 'react'
import {
    fetchPopularMovies,
    fetchSearchMovies
} from '../../sevices/fetchData/fetchData'

export default function HomePage() {
    const [moviesData, setMoviesData] = useState()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [startPage, setStartPage] = useState(1)
    const popularCache = useRef({})
    const searchCache = useRef({})

    const [filters, setFilters] = useState({
        genre: '',
        sortBy: 'popularity.desc',
        rating: '',
        year: ''
    })

    useEffect(() => {
        setPage(1)
        setStartPage(1)
    }, [filters])
    useEffect(() => {
        const getData = async () => {
            setLoading(true)

            try {
                if (!searchQuery.trim()) {
                    const cacheKey = `${page}-${JSON.stringify(filters)}`
                    if (popularCache.current[cacheKey]) {
                        setMoviesData(popularCache.current[cacheKey])
                        return
                    }


                    const data = await fetchPopularMovies(page, filters)
                    popularCache.current[cacheKey] = data
                    setMoviesData(data)
                    return
                }

                const cacheKey = `${searchQuery}-${page}-${JSON.stringify(filters)}`
                if (searchCache.current[cacheKey]) {
                    setMoviesData(searchCache.current[cacheKey])
                    return
                }

                const data = await fetchSearchMovies(searchQuery, page, filters)
                searchCache.current[cacheKey] = data
                setMoviesData(data)

            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [page, searchQuery, filters])

    return (
        <div className={styles.appContainer}>
            <Header
                setSearchQuery={setSearchQuery}
                setPage={setPage}
                setStartPage={setStartPage}
                filters={filters}
                setFilters={setFilters}
            />

            <main className={styles.mainContent}>
                <Content
                    moviesData={moviesData}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    startPage={startPage}
                    setStartPage={setStartPage}
                />
            </main>

            <Footer />
        </div>
    )
}