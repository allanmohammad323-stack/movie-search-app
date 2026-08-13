// HomePage.jsx
import Header from '../../components/layout/header/header.jsx'
import Footer from '../../components/layout/footer/footer.jsx'
import Content from '../../components/layout/content/content.jsx'
import styles from './homepage.module.css' // Create this file

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

    useEffect(() => {
        const getData = async () => {
            setLoading(true)

            try {
                if (!searchQuery.trim()) {
                    if (popularCache.current[page]) {
                        setMoviesData(popularCache.current[page])
                        return
                    }

                    const data = await fetchPopularMovies(page)
                    popularCache.current[page] = data
                    setMoviesData(data)
                    return
                }

                const cacheKey = `${searchQuery}-${page}`
                if (searchCache.current[cacheKey]) {
                    setMoviesData(searchCache.current[cacheKey])
                    return
                }

                const data = await fetchSearchMovies(searchQuery, page)
                searchCache.current[cacheKey] = data
                setMoviesData(data)

            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [page, searchQuery])

    return (
        <div className={styles.appContainer}>
            <Header
                setSearchQuery={setSearchQuery}
                setPage={setPage}
                setStartPage={setStartPage}
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