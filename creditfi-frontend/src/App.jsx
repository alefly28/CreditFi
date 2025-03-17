import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { DEFAULT_NETWORK } from './config/networks';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Borrow from './pages/Borrow';
import Lend from './pages/Lend';
import CreditScore from './pages/CreditScore';
import About from './pages/About';
import Documentation from './pages/Documentation';
import { NotificationProvider } from './context/NotificationContext';
import Notifications from './components/common/Notifications';

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
        <NotificationProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/borrow" element={<Borrow />} />
                <Route path="/lend" element={<Lend />} />
                <Route path="/credit-score" element={<CreditScore />} />
                <Route path="/about" element={<About />} />
                <Route path="/docs" element={<Documentation />} />
              </Routes>
            </Layout>
            <Notifications />
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App; 