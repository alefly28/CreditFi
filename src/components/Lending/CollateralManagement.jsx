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

const CollateralManagement = ({ loan }) => {
  const [additionalCollateral, setAdditionalCollateral] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { addCollateral, withdrawCollateral } = useLendingPool();
  const { addNotification } = useNotifications();

  const handleAddCollateral = async () => {
    setLoading(true);
    try {
      await addCollateral(parseAmount(additionalCollateral));
      addNotification('Collateral added successfully!', 'success');
      setAdditionalCollateral('');
    } catch (error) {
      addNotification('Error adding collateral: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawCollateral = async () => {
    setLoading(true);
    try {
      await withdrawCollateral(parseAmount(withdrawAmount));
      addNotification('Collateral withdrawn successfully!', 'success');
      setWithdrawAmount('');
    } catch (error) {
      addNotification('Error withdrawing collateral: ' + error.message, 'error');
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
          Collateral Management
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography color="textSecondary">Current Collateral</Typography>
            <Typography variant="h6">
              {formatAmount(loan.collateralAmount)} ETH
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">Collateral Ratio</Typography>
            <Typography variant="h6">
              {loan.collateralRatio}%
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Collateral"
              value={additionalCollateral}
              onChange={(e) => setAdditionalCollateral(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCollateral}
              disabled={loading || !additionalCollateral}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Add Collateral'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Withdraw Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleWithdrawCollateral}
              disabled={loading || !withdrawAmount}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Withdraw Collateral'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CollateralManagement; 