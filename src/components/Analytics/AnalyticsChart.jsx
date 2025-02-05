import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';

const AnalyticsChart = ({ title, data, type }) => {
  const chartData = {
    labels: data.map(d => d.timestamp),
    datasets: [{
      label: title,
      data: data.map(d => d.value),
      fill: false,
      borderColor: type === 'line' ? '#90caf9' : '#f48fb1',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {type === 'line' ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart; 