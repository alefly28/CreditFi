import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Borrow from './pages/Borrow';
import Lend from './pages/Lend';
import CreditScore from './pages/CreditScore';
import About from './pages/About';
import Documentation from './pages/Documentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
    },
    secondary: {
      main: '#4FC3F7',
      light: '#81D4FA',
      dark: '#039BE5',
    },
    background: {
      default: '#F5F7F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2027',
      secondary: '#42526E',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        },
      },
    },
  },
});

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/borrow" element={<Borrow />} />
                <Route path="/lend" element={<Lend />} />
                <Route path="/credit-score" element={<CreditScore />} />
                <Route path="/about" element={<About />} />
                <Route path="/docs" element={<Documentation />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
