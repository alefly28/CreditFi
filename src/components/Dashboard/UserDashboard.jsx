import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import CreditScoreCard from '../Credit/CreditScoreCard';
import LendingDashboard from '../Lending/LendingDashboard';
import RewardsCard from '../Rewards/RewardsCard';
import TransactionHistory from '../History/TransactionHistory';
import UserStats from './UserStats';

const UserDashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CreditScoreCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <UserStats />
        </Grid>
        <Grid item xs={12} md={4}>
          <RewardsCard />
        </Grid>
        <Grid item xs={12}>
          <LendingDashboard />
        </Grid>
        <Grid item xs={12}>
          <TransactionHistory />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard; 