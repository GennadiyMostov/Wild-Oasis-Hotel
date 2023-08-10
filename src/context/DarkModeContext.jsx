import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  return (
    <DarkModeContext.Provide value={{ isDarkMode }}>
      {children}
    </DarkModeContext.Provide>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      'Dark mode context was used outside of dark mode provider.'
    );

  return context;
};

export { DarkModeProvider, useDarkMode };
