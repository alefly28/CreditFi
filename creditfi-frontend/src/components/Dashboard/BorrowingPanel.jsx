import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Slider,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { LENDING_POOL_ABI } from '../../config/abis';

const BorrowingPanel = ({ totalBorrowed, creditScore }) => {
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [maxBorrowAmount, setMaxBorrowAmount] = useState('0');
  const [interestRate, setInterestRate] = useState(0);

  useEffect(() => {
    const calculateBorrowLimit = async () => {
      if (account && library) {
        try {
          const lendingContract = new ethers.Contract(
            process.env.REACT_APP_LENDING_POOL_ADDRESS,
            LENDING_POOL_ABI,
            library.getSigner()
          );

          const [maxAmount, rate] = await Promise.all([
            lendingContract.calculateBorrowLimit(account),
            lendingContract.calculateInterestRate(creditScore)
          ]);

          setMaxBorrowAmount(ethers.utils.formatEther(maxAmount));
          setInterestRate(rate.toNumber() / 100); // Convert basis points to percentage
        } catch (err) {
          console.error('Error calculating borrow limit:', err);
        }
      }
    };

    calculateBorrowLimit();
  }, [account, library, creditScore]);

  const handleBorrow = async () => {
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

      const tx = await lendingContract.borrow(
        ethers.utils.parseEther(amount)
      );

      await tx.wait();
      setSuccess('Successfully borrowed ' + amount + ' ETH');
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
        Borrowing
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Total Borrowed
        </Typography>
        <Typography variant="h4">
          {totalBorrowed} ETH
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Available to Borrow: {maxBorrowAmount} ETH
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interest Rate: {interestRate}%
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Amount to Borrow (ETH)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
          inputProps={{
            max: maxBorrowAmount,
            min: 0,
            step: 0.01,
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleBorrow}
          disabled={!amount || loading || !account || parseFloat(amount) > parseFloat(maxBorrowAmount)}
        >
          {loading ? <CircularProgress size={24} /> : 'Borrow ETH'}
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

export default BorrowingPanel; 