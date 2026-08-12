import Styles from './header.module.css'
import Search from '../../search/search'
export default function Header({ setSearchQuery , searchQuery }) {
    return (
        <div className={Styles.headerContainer}>
           <Search setSearchQuery={setSearchQuery}  />
        </div>
    )
}