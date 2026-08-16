import styles from './search.module.css'
import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/usedebounce/usedebounce'

export default function Search({ setSearchQuery, setPage, setStartPage }) {
    const [Search, setSearch] = useState('')
    const debouncedSearch = useDebounce(Search, 1000)

    useEffect(() => {
        if (debouncedSearch) {
            // User typed something - do search
            setPage(1)
            setStartPage(1)
            setSearchQuery(debouncedSearch)
        } else {
            // User cleared the search - show popular movies
            setPage(1)
            setStartPage(1)
            setSearchQuery('') // This triggers your parent to fetch popular
        }
    }, [debouncedSearch])

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search"
                value={Search}
                onChange={(e) => { setSearch(e.target.value); if (!e.target.value) setSearchQuery(''); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.target.blur();

                    }
                }}
            />
        </div>
    )
}