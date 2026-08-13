import Styles from './header.module.css'
import Search from '../../search/search'
export default function Header({ setSearchQuery , setPage , setStartPage }) {
    return (
        <div className={Styles.headerContainer}>
           <Search setSearchQuery={setSearchQuery} setPage={setPage} setStartPage={setStartPage} />
        </div>
    )
}