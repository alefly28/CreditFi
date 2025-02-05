import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { useRewards } from '../../hooks/useRewards';

const RewardsCard = () => {
  const { rewards, claimRewards, loading } = useRewards();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Rewards</Typography>
        <Typography variant="h4">{rewards} LRWD</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={claimRewards}
          disabled={loading || rewards === 0}
        >
          Claim Rewards
        </Button>
      </CardContent>
    </Card>
  );
};

export default RewardsCard; 