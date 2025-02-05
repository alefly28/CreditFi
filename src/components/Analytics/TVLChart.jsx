import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';
import { useTVLHistory } from '../../hooks/useTVLHistory';

const TVLChart = () => {
  const theme = useTheme();
  const { data, loading } = useTVLHistory();

  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Total Value Locked',
        data: data.map(d => d.value),
        fill: false,
        borderColor: theme.palette.primary.main,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
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
        <Typography variant="h6" gutterBottom>
          Total Value Locked Over Time
        </Typography>
        <Box height={400}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography>Loading chart data...</Typography>
            </Box>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TVLChart; 