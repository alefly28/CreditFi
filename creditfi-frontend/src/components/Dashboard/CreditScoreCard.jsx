import React from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScoreCircle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  margin: theme.spacing(2),
}));

const CreditScoreCard = ({ score }) => {
  // Calculate color based on score
  const getScoreColor = (score) => {
    if (score >= 700) return '#4caf50';
    if (score >= 500) return '#ff9800';
    return '#f44336';
  };

  // Calculate progress percentage
  const progress = (score / 1000) * 100;

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Credit Score
      </Typography>
      
      <ScoreCircle>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={160}
          thickness={4}
          sx={{ color: getScoreColor(score) }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" component="div" color="text.secondary">
            {score}
          </Typography>
        </Box>
      </ScoreCircle>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {score >= 700 ? 'Excellent' : score >= 500 ? 'Good' : 'Needs Improvement'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Score Range: 0-1000
        </Typography>
      </Box>
    </Paper>
  );
};

export default CreditScoreCard; 