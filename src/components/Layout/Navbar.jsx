import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils/address';

const Navbar = () => {
  const { account, activate, active } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injectedConnector);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DeFi Lending Platform
        </Typography>
        {active ? (
          <Button color="inherit">{shortenAddress(account)}</Button>
        ) : (
          <Button color="inherit" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 