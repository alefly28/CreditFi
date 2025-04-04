import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { LENDING_POOL_ABI } from '../../config/abis';

const LendingPanel = ({ totalLent }) => {
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLend = async () => {
    if (!amount || !account) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const lendingContract = new ethers.Contract(
        process.env.REACT_APP_LENDING_POOL_ADDRESS,
        LENDING_POOL_ABI,
        library.getSigner()
      );

      const tx = await lendingContract.lend({
        value: ethers.utils.parseEther(amount)
      });

      await tx.wait();
      setSuccess('Successfully lent ' + amount + ' ETH');
      setAmount('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Lending
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Total Amount Lent
        </Typography>
        <Typography variant="h4">
          {totalLent} ETH
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Amount to Lend (ETH)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLend}
          disabled={!amount || loading || !account}
        >
          {loading ? <CircularProgress size={24} /> : 'Lend ETH'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default LendingPanel; 