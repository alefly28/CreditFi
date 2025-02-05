import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@material-ui/core';
import { useLendingMetrics } from '../../hooks/useLendingMetrics';
import { formatPercentage } from '../../utils/formatters';

const LendingMetrics = () => {
  const { metrics, loading } = useLendingMetrics();

  const renderMetric = (label, value, progress) => (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography color="textSecondary">{label}</Typography>
        <Typography>{formatPercentage(value)}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="primary"
      />
    </Box>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Lending Metrics
        </Typography>
        {loading ? (
          <Typography>Loading metrics...</Typography>
        ) : (
          <>
            {renderMetric('Utilization Rate', metrics.utilizationRate, metrics.utilizationRate)}
            {renderMetric('Collateralization Ratio', metrics.collateralizationRatio, 
              (metrics.collateralizationRatio / 2))} {/* Scaled for visualization */}
            {renderMetric('Default Rate', metrics.defaultRate, metrics.defaultRate)}
            {renderMetric('Recovery Rate', metrics.recoveryRate, metrics.recoveryRate)}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LendingMetrics; 