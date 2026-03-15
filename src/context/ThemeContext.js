import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const THEME_KEY = '@flomo_theme';

export const themes = {
  light: {
    name: 'light',
    colors: {
      background: '#f5f5f5',
      card: '#ffffff',
      text: '#333333',
      textSecondary: '#999999',
      border: '#e0e0e0',
      primary: '#007AFF',
      success: '#34C759',
      warning: '#FF9500',
      danger: '#FF3B30',
      tag: '#E8F4FF',
      tagText: '#007AFF',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      background: '#000000',
      card: '#1c1c1e',
      text: '#ffffff',
      textSecondary: '#8e8e93',
      border: '#38383a',
      primary: '#0A84FF',
      success: '#30D158',
      warning: '#FF9F0A',
      danger: '#FF453A',
      tag: '#1c3a5c',
      tagText: '#0A84FF',
    },
  },
};

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    if (themeMode === 'system') {
      setTheme(systemColorScheme === 'dark' ? themes.dark : themes.light);
    } else {
      setTheme(themes[themeMode]);
    }
  }, [themeMode, systemColorScheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const setThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, mode);
      setThemeMode(mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemePreference(newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemePreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
