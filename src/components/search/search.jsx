import styles from './search.module.css'
import { useState ,useEffect} from 'react'
import { useDebounce } from '../../hooks/usedebounce/usedebounce'
export default function Search({ setSearchQuery  }) {
    const [Search, setSearch] = useState('');
    const debouncedSearch = useDebounce(Search, 1000);
    useEffect(() => {
        if (Search) {
            setSearchQuery(debouncedSearch);
        }
        
      
    }, [debouncedSearch]);
    return (
        <div className={styles.searchContainer}>
            <input className={styles.searchInput}
             type="text" 
             placeholder="Search" 
             value={Search}
             onChange={(e) =>{ setSearch(e.target.value); console.log(Search)}}
             />
        </div>
    );
}