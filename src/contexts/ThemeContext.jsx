// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and update CSS variables
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Update CSS custom properties
    const root = document.documentElement;
    
    if (newDarkMode) {
      root.style.setProperty('--bg-primary', '#1f2937');
      root.style.setProperty('--bg-secondary', '#111827');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#e5e7eb');
      root.style.setProperty('--bg-card', '#374151');
      root.style.setProperty('--nav-bg', 'rgba(17, 24, 39, 0.95)');
      localStorage.setItem('theme', 'dark');
    } else {
      root.style.setProperty('--bg-primary', '#f9fafb');
      root.style.setProperty('--bg-secondary', '#f3f4f6');
      root.style.setProperty('--text-primary', '#1f2937');
      root.style.setProperty('--text-secondary', '#4b5563');
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.95)');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check for saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const root = document.documentElement;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      root.style.setProperty('--bg-primary', '#1f2937');
      root.style.setProperty('--bg-secondary', '#111827');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#e5e7eb');
      root.style.setProperty('--bg-card', '#374151');
      root.style.setProperty('--nav-bg', 'rgba(17, 24, 39, 0.95)');
    } else {
      setDarkMode(false);
      root.style.setProperty('--bg-primary', '#f9fafb');
      root.style.setProperty('--bg-secondary', '#f3f4f6');
      root.style.setProperty('--text-primary', '#1f2937');
      root.style.setProperty('--text-secondary', '#4b5563');
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.95)');
    }
  }, []);

  const value = {
    darkMode,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};