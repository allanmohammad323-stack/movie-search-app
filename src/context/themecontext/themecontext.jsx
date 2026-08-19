// context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define available themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && Object.values(THEMES).includes(storedTheme)) {
      return storedTheme;
    }
    return THEMES.SYSTEM;
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState('light');

  // Detect system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    const currentTheme = theme === THEMES.SYSTEM ? systemTheme : theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.className = currentTheme;
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    setTheme(prev => prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  // Set specific theme
  const setSpecificTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  // Get current active theme (resolved)
  const getActiveTheme = () => {
    return theme === THEMES.SYSTEM ? systemTheme : theme;
  };

  const value = {
    theme,
    systemTheme,
    activeTheme: getActiveTheme(),
    setTheme: setSpecificTheme,
    toggleTheme,
    isDark: getActiveTheme() === 'dark',
    isLight: getActiveTheme() === 'light',
    isSystem: theme === THEMES.SYSTEM
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;