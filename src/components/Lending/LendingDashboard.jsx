import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { useLendingPool } from '../../hooks/useLendingPool';

const LendingDashboard = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const { deposit, borrow, userDeposits, userLoans } = useLendingPool();

  const handleDeposit = async () => {
    try {
      await deposit(depositAmount);
      setDepositAmount('');
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  const handleBorrow = async () => {
    try {
      await borrow(borrowAmount);
      setBorrowAmount('');
    } catch (error) {
      console.error('Error borrowing:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Deposit</Typography>
            <TextField
              fullWidth
              label="Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeposit}
              fullWidth
            >
              Deposit
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Borrow</Typography>
            <TextField
              fullWidth
              label="Amount"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleBorrow}
              fullWidth
            >
              Borrow
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LendingDashboard; 