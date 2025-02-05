import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@material-ui/core';
import { useAdminFunctions } from '../../hooks/useAdminFunctions';

const AdminPanel = () => {
  const [minimumCreditScore, setMinimumCreditScore] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const { updateMinCreditScore, updateInterestRate, pauseContract, unpauseContract } = useAdminFunctions();

  const handleUpdateCreditScore = async () => {
    try {
      await updateMinCreditScore(minimumCreditScore);
      setMinimumCreditScore('');
    } catch (error) {
      console.error('Error updating credit score:', error);
    }
  };

  const handleUpdateInterestRate = async () => {
    try {
      await updateInterestRate(interestRate);
      setInterestRate('');
    } catch (error) {
      console.error('Error updating interest rate:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Update Minimum Credit Score</Typography>
              <TextField
                fullWidth
                label="Minimum Credit Score"
                value={minimumCreditScore}
                onChange={(e) => setMinimumCreditScore(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateCreditScore}
                fullWidth
              >
                Update
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Update Interest Rate</Typography>
              <TextField
                fullWidth
                label="Interest Rate (%)"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateInterestRate}
                fullWidth
              >
                Update
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Emergency Controls</Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={pauseContract}
                  fullWidth
                  style={{ marginBottom: 16 }}
                >
                  Pause Contract
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={unpauseContract}
                  fullWidth
                >
                  Unpause Contract
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPanel; 