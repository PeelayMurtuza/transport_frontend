import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Comprehensive light theme
export const lightTheme = {
  // Backgrounds
  bg: {
    primary: 'bg-white',
    secondary: 'bg-slate-50',
    tertiary: 'bg-slate-100',
    accent: 'bg-blue-50',
    hover: 'hover:bg-slate-100',
    active: 'bg-blue-100',
    gradient: 'from-white via-slate-50 to-blue-50',
    card: 'bg-white',
    input: 'bg-white',
    button: 'bg-blue-500',
    buttonHover: 'hover:bg-blue-600',
  },
  // Text colors
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    tertiary: 'text-gray-500',
    accent: 'text-blue-600',
    light: 'text-gray-400',
    inverse: 'text-white',
    muted: 'text-gray-600',
  },
  // Borders and dividers
  border: {
    primary: 'border-gray-300',
    secondary: 'border-gray-200',
    light: 'border-gray-100',
    accent: 'border-blue-300',
  },
  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none',
  },
  // Form elements
  input: {
    bg: 'bg-white',
    border: 'border-gray-300',
    text: 'text-gray-900',
    placeholder: 'placeholder-gray-500',
    focus: 'focus:ring-blue-500 focus:border-blue-500',
  },
  // Cards and containers
  card: {
    bg: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    hover: 'hover:bg-slate-50',
  },
  // Buttons
  button: {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  },
  // Status colors
  status: {
    success: 'text-green-600 bg-green-50',
    error: 'text-red-600 bg-red-50',
    warning: 'text-yellow-600 bg-yellow-50',
    info: 'text-blue-600 bg-blue-50',
  },
  // Additional utilities
  navbar: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100',
  },
  sidebar: {
    bg: 'bg-slate-50',
    text: 'text-gray-900',
    border: 'border-gray-200',
    active: 'bg-blue-100 text-blue-600',
  },
  modal: {
    bg: 'bg-white',
    overlay: 'bg-black/50',
  },
  badge: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
  },
};

// Comprehensive dark theme
export const darkTheme = {
  // Backgrounds
  bg: {
    primary: 'bg-gray-900',
    secondary: 'bg-gray-800',
    tertiary: 'bg-gray-700',
    accent: 'bg-blue-900',
    hover: 'hover:bg-gray-800',
    active: 'bg-blue-800',
    gradient: 'from-gray-900 via-gray-800 to-blue-900',
    card: 'bg-gray-800',
    input: 'bg-gray-700',
    button: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-700',
  },
  // Text colors
  text: {
    primary: 'text-white',
    secondary: 'text-gray-200',
    tertiary: 'text-gray-400',
    accent: 'text-blue-400',
    light: 'text-gray-500',
    inverse: 'text-gray-900',
    muted: 'text-gray-300',
  },
  // Borders and dividers
  border: {
    primary: 'border-gray-600',
    secondary: 'border-gray-700',
    light: 'border-gray-800',
    accent: 'border-blue-600',
  },
  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none',
  },
  // Form elements
  input: {
    bg: 'bg-gray-700',
    border: 'border-gray-600',
    text: 'text-white',
    placeholder: 'placeholder-gray-400',
    focus: 'focus:ring-blue-600 focus:border-blue-600',
  },
  // Cards and containers
  card: {
    bg: 'bg-gray-800',
    border: 'border-gray-700',
    text: 'text-white',
    hover: 'hover:bg-gray-700',
  },
  // Buttons
  button: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
    ghost: 'bg-transparent text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  },
  // Status colors
  status: {
    success: 'text-green-400 bg-green-900/30',
    error: 'text-red-400 bg-red-900/30',
    warning: 'text-yellow-400 bg-yellow-900/30',
    info: 'text-blue-400 bg-blue-900/30',
  },
  // Additional utilities
  navbar: {
    bg: 'bg-gray-800',
    text: 'text-white',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700',
  },
  sidebar: {
    bg: 'bg-gray-800',
    text: 'text-white',
    border: 'border-gray-700',
    active: 'bg-blue-700 text-blue-200',
  },
  modal: {
    bg: 'bg-gray-800',
    overlay: 'bg-black/70',
  },
  badge: {
    bg: 'bg-blue-800',
    text: 'text-blue-200',
  },
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      updateDocumentTheme(newValue);
      return newValue;
    });
  };

  // Update document element with data-theme attribute
  const updateDocumentTheme = (dark) => {
    const html = document.documentElement;
    if (dark) {
      html.setAttribute('data-theme', 'dark');
      html.classList.add('dark');
    } else {
      html.setAttribute('data-theme', 'light');
      html.classList.remove('dark');
    }
  };

  // Set initial theme
  useEffect(() => {
    updateDocumentTheme(isDark);
  }, [isDark]);

  const theme = isDark ? darkTheme : lightTheme;

  const value = {
    isDark,
    toggleTheme,
    theme,
    lightTheme,
    darkTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
