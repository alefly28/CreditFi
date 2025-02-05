import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Web3Provider } from './context/Web3Context';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import { routes } from './utils/routes';
import { theme } from './utils/theme';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  {routes.map(({ path, component: Component, isAdmin }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute requireAdmin={isAdmin}>
                          <Component />
                        </ProtectedRoute>
                      }
                    />
                  ))}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </Web3Provider>
    </Web3ReactProvider>
  );
}

export default App; 