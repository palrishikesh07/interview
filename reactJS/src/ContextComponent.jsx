
import { useState, createContext, useContext } from 'react';

// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Value
export function ContextComponent() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// 3. Consume Value
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log('Current Theme:', theme);
  return <button style={{ background: theme === 'light' ? '#fff' : '#333' }}
    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  >Click Me
  </button>;
}   