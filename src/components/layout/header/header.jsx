import Styles from './header.module.css'
import Search from '../../search/search'
import Filters from '../../filters/filters'
export default function Header({searchQuery, setSearchQuery , setPage , setStartPage , filters , setFilters  }) {
    return (
        <div className={Styles.headerContainer}>
           <Search setSearchQuery={setSearchQuery} setPage={setPage} setStartPage={setStartPage}  />
        <Filters filters={filters} setFilters={setFilters} searchQuery={searchQuery}/>
        </div>
    )
}