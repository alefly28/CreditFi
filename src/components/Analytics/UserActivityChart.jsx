import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, ButtonGroup, Button } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';
import { useUserActivity } from '../../hooks/useUserActivity';

const timeRanges = ['1W', '1M', '3M', '1Y', 'ALL'];

const UserActivityChart = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('1M');
  const { data, loading } = useUserActivity(timeRange);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Deposits',
        data: data.map(d => d.deposits),
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Borrows',
        data: data.map(d => d.borrows),
        backgroundColor: theme.palette.secondary.main,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider,
        },
      },
      x: {
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">User Activity</Typography>
          <ButtonGroup size="small" color="primary">
            {timeRanges.map((range) => (
              <Button
                key={range}
                onClick={() => setTimeRange(range)}
                variant={timeRange === range ? 'contained' : 'outlined'}
              >
                {range}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box height={400}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography>Loading activity data...</Typography>
            </Box>
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserActivityChart; 