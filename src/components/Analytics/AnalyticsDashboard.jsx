import React from 'react';
import { Grid } from '@material-ui/core';
import MetricsCard from './MetricsCard';
import TVLChart from './TVLChart';
import LendingMetrics from './LendingMetrics';
import UserActivityChart from './UserActivityChart';
import { useAnalytics } from '../../hooks/useAnalytics';

const AnalyticsDashboard = () => {
  const { metrics, loading } = useAnalytics();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <MetricsCard
          title="Total Value Locked"
          value={metrics.tvl}
          loading={loading}
          prefix="$"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <MetricsCard
          title="Active Users"
          value={metrics.activeUsers}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <MetricsCard
          title="Total Loans"
          value={metrics.totalLoans}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <MetricsCard
          title="Average APY"
          value={metrics.averageApy}
          loading={loading}
          suffix="%"
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <TVLChart />
      </Grid>
      <Grid item xs={12} lg={4}>
        <LendingMetrics />
      </Grid>
      <Grid item xs={12}>
        <UserActivityChart />
      </Grid>
    </Grid>
  );
};

export default AnalyticsDashboard; 