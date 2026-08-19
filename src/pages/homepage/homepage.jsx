// pages/HomePage/HomePage.jsx
import Header from '../../components/layout/header/header.jsx'
import Footer from '../../components/layout/footer/footer.jsx'
import Content from '../../components/layout/content/content.jsx'
import styles from './homepage.module.css'

import { useEffect, useState, useRef } from 'react'
import { useTheme } from '../../context/themecontext/themecontext'
import {
    fetchPopularMovies,
    fetchSearchMovies
} from '../../sevices/fetchData/fetchData'

export default function HomePage() {
    const { activeTheme } = useTheme()
    const isDark = activeTheme === 'dark'
    
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
    const previousFilters = useRef(filters)

    useEffect(() => {
        const controller = new AbortController()
        const filtersChanged = previousFilters.current !== filters
        previousFilters.current = filters

        if (filtersChanged) {
            setStartPage(1)

            if (page !== 1) {
                setPage(1)
                return () => controller.abort()
            }
        }

        const getData = async () => {
            setLoading(true)

            try {
                if (!searchQuery.trim()) {
                    const cacheKey = `${page}-${JSON.stringify(filters)}`
                    if (popularCache.current[cacheKey]) {
                        setMoviesData(popularCache.current[cacheKey])
                        return
                    }

                    const data = await fetchPopularMovies(page, filters, controller.signal)
                    popularCache.current[cacheKey] = data
                    setMoviesData(data)
                    return
                }

                const cacheKey = `${searchQuery}-${page}-${JSON.stringify(filters)}`
                if (searchCache.current[cacheKey]) {
                    setMoviesData(searchCache.current[cacheKey])
                    return
                }

                const data = await fetchSearchMovies(
                    searchQuery,
                    page,
                    filters,
                    controller.signal
                )
                searchCache.current[cacheKey] = data
                setMoviesData(data)

            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error('Error fetching data:', error)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        getData()

        return () => controller.abort()
    }, [page, searchQuery, filters])

    return (
        <div className={`${styles.appContainer} ${isDark ? styles.dark : styles.light}`}>
            <Header
                setSearchQuery={setSearchQuery}
                setPage={setPage}
                setStartPage={setStartPage}
                filters={filters}
                setFilters={setFilters}
                searchQuery={searchQuery}
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