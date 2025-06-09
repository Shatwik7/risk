import { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#00796b',
    },
    error: {
      main: '#c62828',
    },
    warning: {
      main: '#ff8f00',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f5f5f7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  
  const value = {
    toggleTheme: () => {
      // Logic to toggle theme can be added here
      console.log('Toggle theme function called');
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}