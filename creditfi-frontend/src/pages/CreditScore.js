import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Button,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ethers } from 'ethers';

const CreditScore = () => {
  const [score, setScore] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scoreHistory = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credit Score',
        data: [650, 670, 690, 685, 700, 720],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Credit Score History',
      },
    },
    scales: {
      y: {
        min: 300,
        max: 850,
      },
    },
  };

  const fetchCreditScore = async () => {
    setLoading(true);
    try {
      // Implement actual contract interaction here
      const mockData = {
        score: 720,
        repaymentHistory: 85,
        walletBalance: '5.2 ETH',
        collateralRatio: 165,
        transactionVolume: '25.5 ETH',
        loanDefaults: 0,
        timeInDeFi: 180,
      };
      setScore(mockData.score);
      setScoreData(mockData);
    } catch (error) {
      setError('Failed to fetch credit score. Please try again.');
      console.error('Error fetching credit score:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditScore();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 750) return '#4caf50';
    if (score >= 670) return '#2196f3';
    if (score >= 580) return '#ff9800';
    return '#f44336';
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={fetchCreditScore} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Credit Score Display */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Your Credit Score
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-flex',
                  my: 2,
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={(score / 850) * 100}
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
                  <Typography variant="h3" component="div" color={getScoreColor(score)}>
                    {score}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" color={getScoreColor(score)}>
                {getScoreCategory(score)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Score Factors */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Score Factors
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Repayment History"
                    secondary={`${scoreData?.repaymentHistory}% successful repayments`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Wallet Balance"
                    secondary={scoreData?.walletBalance}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Collateral Ratio"
                    secondary={`${scoreData?.collateralRatio}%`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Transaction Volume"
                    secondary={scoreData?.transactionVolume}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Loan Defaults"
                    secondary={scoreData?.loanDefaults}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Time in DeFi"
                    secondary={`${scoreData?.timeInDeFi} days`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Score History Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Line options={options} data={scoreHistory} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreditScore; 