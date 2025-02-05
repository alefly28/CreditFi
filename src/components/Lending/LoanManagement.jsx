import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { useLendingPool } from '../../hooks/useLendingPool';
import { formatAmount, parseAmount } from '../../utils/formatters';
import { useNotifications } from '../../hooks/useNotifications';

const LoanManagement = ({ loan }) => {
  const [repayAmount, setRepayAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { repayLoan } = useLendingPool();
  const { addNotification } = useNotifications();

  const handleRepay = async () => {
    setLoading(true);
    try {
      await repayLoan(parseAmount(repayAmount));
      addNotification('Loan repaid successfully!', 'success');
      setRepayAmount('');
    } catch (error) {
      addNotification('Error repaying loan: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!loan.active) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Active Loan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography color="textSecondary">Amount Borrowed</Typography>
            <Typography variant="h6">
              {formatAmount(loan.amount)} ETH
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">Collateral</Typography>
            <Typography variant="h6">
              {formatAmount(loan.collateralAmount)} ETH
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Repayment Amount"
              value={repayAmount}
              onChange={(e) => setRepayAmount(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRepay}
              disabled={loading || !repayAmount}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Repay Loan'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoanManagement; 