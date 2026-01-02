import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { theme, darkTheme } from '../styles/theme';
import type { Theme } from '../styles/theme';

/**
 * Theme Context Value Interface
 */
interface ThemeContextValue {
  theme: Theme | typeof darkTheme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

/**
 * Theme Context
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Local Storage Key for Theme Preference
 */
const THEME_STORAGE_KEY = 'app-theme-mode';

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider Component
 * Provides theme context to the entire application
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored !== null) {
      return stored === 'dark';
    }
    
    // Fall back to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return false;
  });

  // Get current theme based on mode
  const currentTheme = isDarkMode ? darkTheme : theme;

  /**
   * Toggle between light and dark mode
   */
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  /**
   * Set dark mode explicitly
   * @param isDark - Whether to enable dark mode
   */
  const setDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  };

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(currentTheme.colors.neutral).forEach(([key, value]) => {
      root.style.setProperty(`--color-neutral-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--color-secondary-${key}`, value);
    });
    
    // Apply semantic colors
    root.style.setProperty('--color-success', currentTheme.colors.success);
    root.style.setProperty('--color-warning', currentTheme.colors.warning);
    root.style.setProperty('--color-error', currentTheme.colors.error);
    root.style.setProperty('--color-info', currentTheme.colors.info);
    
    // Apply data attribute for CSS targeting
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [currentTheme, isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === null) {
        setIsDarkMode(e.matches);
      }
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const value: ThemeContextValue = {
    theme: currentTheme,
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * Access theme context and dark mode controls
 * 
 * @returns Theme context value
 * @throws Error if used outside ThemeProvider
 * 
 * @example
 * const { theme, isDarkMode, toggleDarkMode } = useTheme();
 * 
 * return (
 *   <button onClick={toggleDarkMode}>
 *     {isDarkMode ? 'Light Mode' : 'Dark Mode'}
 *   </button>
 * );
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default useTheme;
