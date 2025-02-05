import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useCreditScore } from '../../hooks/useCreditScore';

const CreditScoreCard = () => {
  const { creditScore, loading } = useCreditScore();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Credit Score</Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Typography variant="h3">{creditScore}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditScoreCard; 