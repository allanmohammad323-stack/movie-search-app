import Header from '../../components/layout/header/header.jsx'
import Footer from '../../components/layout/footer/footer.jsx'
import Content from '../../components/layout/content/content.jsx'

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

    const popularCache = useRef({})
    const searchCache = useRef({})

    useEffect(() => {
        const getData = async () => {
            setLoading(true)

            try {
                // Empty search → popular movies
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

                // Search movies
                const cacheKey = `${searchQuery}-${page}`

                if (searchCache.current[cacheKey]) {
                    setMoviesData(searchCache.current[cacheKey])
                    return
                }

                const data = await fetchSearchMovies(
                    searchQuery,
                    page
                )

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
        <>
            <Header
                setSearchQuery={setSearchQuery}
            />

            <Content
                moviesData={moviesData}
                loading={loading}
                page={page}
                setPage={setPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <Footer />
        </>
    )
}