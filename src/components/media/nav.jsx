import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    FiHome, 
    FiFilm, 
    FiBookmark, 
    FiSearch, 
    FiUser, 
    FiMenu, 
    FiX,
    FiMoon,
    FiSun
} from 'react-icons/fi';
import styles from './nav.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    const navItems = [
        { 
            id: 'home', 
            label: 'Home', 
            path: '/', 
            icon: <FiHome size={20} /> 
        },
        { 
            id: 'movies', 
            label: 'Movies', 
            path: '/movies', 
            icon: <FiFilm size={20} /> 
        },
        { 
            id: 'watchlist', 
            label: 'Watch List', 
            path: '/watchlist', 
            icon: <FiBookmark size={20} /> 
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.body.classList.add('dark-theme');
        }
    }, []);

    // Define toggleMenu function
    const toggleMenu = () => setIsOpen(!isOpen);
    
    // Define toggleTheme function
    const toggleTheme = () => {
        setIsDark(!isDark);
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                

                {/* Search Bar - Desktop */}
                <div className={`${styles.navSearch} ${styles.desktop}`}>
                    <FiSearch size={18} className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search movies..." 
                        className={styles.searchInput}
                    />
                </div>

                {/* Navigation Menu */}
                <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.id} className={styles.navItem}>
                            <Link
                                to={item.path}
                                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                            >
                                <span className={styles.navIcon}>{item.icon}</span>
                                <span className={styles.navLabel}>{item.label}</span>
                                {isActive(item.path) && (
                                    <span className={styles.navIndicator} />
                                )}
                            </Link>
                        </li>
                    ))}
                    
                    {/* Mobile Search */}
                    <li className={`${styles.navItem} ${styles.mobileSearch}`}>
                        <div className={styles.navSearch}>
                            <FiSearch size={18} className={styles.searchIcon} />
                            <input 
                                type="text" 
                                placeholder="Search movies..." 
                                className={styles.searchInput}
                            />
                        </div>
                    </li>

                    {/* Mobile Theme Toggle */}
                    <li className={`${styles.navItem} ${styles.mobileThemeToggle}`}>
                        <button 
                            className={styles.themeToggle} 
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </li>
                </ul>

                {/* Right Actions */}
                <div className={styles.navActions}>
                    <button 
                        className={`${styles.themeToggle} ${styles.desktop}`}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>
                    
                    <Link to="/profile" className={styles.navProfile}>
                        <FiUser size={20} />
                    </Link>

                    {/* Hamburger */}
                    <button 
                        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            <div 
                className={`${styles.navOverlay} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
            />
        </nav>
    );
};

export default Navbar;