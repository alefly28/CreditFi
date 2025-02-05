import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@material-ui/core';

const ConnectWalletButton = () => {
  const { connect } = useAuth();

  return (
    <Button variant="contained" color="primary" onClick={connect}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton; 