import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { getContractAddress } from '../../config/contracts';
import TestnetFaucetABI from '../../contracts/TestnetFaucet.json';
import { useNotifications } from '../../context/NotificationContext';

const FaucetButton = () => {
  const { account, library } = useWeb3React();
  const { notifyTransaction } = useNotifications();
  const [loading, setLoading] = useState(false);

  const requestTokens = async () => {
    if (!account || !library) return;

    setLoading(true);
    try {
      const faucetAddress = getContractAddress('faucet');
      const faucet = new Contract(
        faucetAddress,
        TestnetFaucetABI,
        library.getSigner()
      );

      const tx = await faucet.requestTokens(
        getContractAddress('lendingToken')
      );

      notifyTransaction(tx, 'Requesting tokens from faucet');
      await tx.wait();
    } catch (error) {
      console.error('Error requesting tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!account) return null;

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={requestTokens}
      disabled={loading}
      startIcon={loading && <CircularProgress size={20} color="inherit" />}
    >
      {loading ? 'Requesting...' : 'Get Test Tokens'}
    </Button>
  );
};

export default FaucetButton; 