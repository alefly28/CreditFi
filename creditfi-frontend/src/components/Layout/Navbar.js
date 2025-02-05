import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditGauge from '../Icons/CreditGauge';
import { useWeb3React } from '@web3-react/core';
import { injected, getErrorMessage } from '../../utils/web3';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const theme = useTheme();
  const { active, account, activate, deactivate } = useWeb3React();
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to activate with injected provider if already authorized
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected).catch((error) => {
          setError(getErrorMessage(error));
        });
      }
    });
  }, [activate]);

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const disconnectWallet = () => {
    try {
      deactivate();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(90deg, #006D77 0%, #83C5BE 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditGauge sx={{ fontSize: 36, color: 'white', mt: 0.5 }} />
            <Logo sx={{ height: 45, filter: 'brightness(1)' }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/about"
              sx={{ 
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              About
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/docs"
              sx={{ 
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Docs
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard"
              sx={{ 
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/borrow"
              sx={{ 
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Borrow
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/lend"
              sx={{ 
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Lend
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/credit-score"
              sx={{ 
                fontSize: '0.95rem',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Credit Score
            </Button>
            {active && account ? (
              <Button 
                variant="outlined" 
                color="inherit" 
                startIcon={<AccountBalanceWalletIcon />}
                onClick={disconnectWallet}
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={connectWallet}
                sx={{ 
                  bgcolor: 'white', 
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar; 