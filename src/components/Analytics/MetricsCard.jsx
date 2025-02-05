import React from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';

const MetricsCard = ({ title, value, loading }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h4">
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard; 