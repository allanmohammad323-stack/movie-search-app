// filters.jsx
import styles from './filters.module.css'

export default function Filters({ filters, setFilters, searchQuery }) {
    return (
        <div className={styles.filterContainer}>
            <select 
                className={styles.filterBtn}
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                disabled={searchQuery !== ''}
            >
                <option value="">Sort by</option>
                <option value="popularity.desc">Popularity</option>
                <option value="vote_average.desc">Rating</option>
                <option value="release_date.desc">Release Date</option>
                <option value="release_date.asc">Release Date (Oldest)</option>
                <option value="title.asc">Title (A-Z)</option>
                <option value="title.desc">Title (Z-A)</option>
            </select>

            <select 
                className={styles.filterBtn}
                value={filters.genre}
                onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                disabled={searchQuery !== ''}
            >
                <option value="">Genre</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Sci-Fi</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>
            </select>

            <select 
                className={styles.filterBtn}
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                disabled={searchQuery !== ''}
            >
                <option value="">Rating</option>
                <option value="9">9+ Stars</option>
                <option value="8">8+ Stars</option>
                <option value="7">7+ Stars</option>
                <option value="6">6+ Stars</option>
                <option value="5">5+ Stars</option>
                <option value="4">4+ Stars</option>
            </select>

            <select 
                className={styles.filterBtn}
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
                <option value="">Year</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2000s">2000s</option>
                <option value="1990s">1990s</option>
                <option value="1980s">1980s</option>
                <option value="1970s">1970s</option>
                <option value="1960s">1960s</option>
                <option value="1950s">1950s</option>
            </select>
        </div>
    )
}