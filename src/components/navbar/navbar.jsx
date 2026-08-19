import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import watchListIcon from '../../assets/img/watchlist.png'
import ThemeToggle from '../theme/theme.jsx'
const Navigation = () => {
  return (
    <nav className={styles.glassContainer}>
      <Link to="/" className={styles.glassLink}>
        🏠 Home
      </Link>
      <Link to="/watchlist" className={styles.glassLink}>
        <img src={watchListIcon} alt="Watchlist" />Watchlist
      </Link>
      <ThemeToggle />
    </nav>
  );
};

export default Navigation;