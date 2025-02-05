import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { useUserStats } from '../../hooks/useUserStats';
import { formatAmount, formatPercentage } from '../../utils/formatters';

const UserStats = () => {
  const { stats, loading } = useUserStats();

  if (loading) {
    return <div>Loading...</div>;
  }

  const statItems = [
    { label: 'Total Deposited', value: `${formatAmount(stats.totalDeposited)} ETH` },
    { label: 'Total Borrowed', value: `${formatAmount(stats.totalBorrowed)} ETH` },
    { label: 'Active Loans', value: stats.activeLoans },
    { label: 'Collateral Ratio', value: formatPercentage(stats.collateralRatio) },
    { label: 'Rewards Earned', value: `${formatAmount(stats.rewardsEarned)} LRWD` },
    { label: 'Loyalty Level', value: stats.loyaltyLevel },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Statistics
        </Typography>
        <Grid container spacing={2}>
          {statItems.map((item) => (
            <Grid item xs={6} key={item.label}>
              <Typography color="textSecondary" gutterBottom>
                {item.label}
              </Typography>
              <Typography variant="h6">
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserStats; 