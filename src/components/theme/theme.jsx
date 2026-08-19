// components/ThemeToggle.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme, THEMES } from '../../context/themecontext/themecontext';
import styles from './theme.module.css';

const ThemeToggle = () => {
  const { activeTheme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(activeTheme === 'dark');
  const [isFocused, setIsFocused] = useState(false);
  const toggleRef = useRef(null);

  // Sync checkbox state with theme
  useEffect(() => {
    setIsChecked(activeTheme === 'dark');
  }, [activeTheme]);

  const handleToggle = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    setTheme(checked ? THEMES.DARK : THEMES.LIGHT);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleRef.current?.click();
    }
  };

  return (
    <div className={styles.themeToggleWrapper}>
      

      <label 
        className={styles.toggleSwitch}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <input
          ref={toggleRef}
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.toggleInput}
          aria-label={`Switch to ${isChecked ? 'light' : 'dark'} mode`}
          aria-checked={isChecked}
          role="switch"
        />
        
        <span className={`${styles.toggleSlider} ${isFocused ? styles.focused : ''}`}>
          <span className={styles.toggleKnob}>
            <span className={styles.knobIcon}>
              {isChecked ? '🌙' : '☀️'}
            </span>
          </span>
        </span>
        
        
      </label>

      
    </div>
  );
};

export default ThemeToggle;