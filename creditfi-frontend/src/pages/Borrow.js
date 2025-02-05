import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Slider,
  Box,
  Alert,
  Divider,
  useTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Borrow = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [duration, setDuration] = useState(30);

  const handleBorrow = async () => {
    // Implement borrowing logic here
    console.log('Borrowing:', { loanAmount, collateralAmount, duration });
  };

  const calculateInterest = () => {
    const amount = parseFloat(loanAmount) || 0;
    return (amount * 0.1 * duration) / 365; // 10% APR
  };

  const calculateRequiredCollateral = () => {
    const amount = parseFloat(loanAmount) || 0;
    return amount * 1.5; // 150% collateral ratio
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Borrow Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Borrow Assets
              </Typography>
              <Typography color="textSecondary" paragraph>
                Get a loan by providing collateral
              </Typography>

              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Loan Amount (ETH)"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Collateral Amount (ETH)"
                  type="number"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Typography gutterBottom>
                  Loan Duration: {duration} days
                </Typography>
                <Slider
                  value={duration}
                  onChange={(e, newValue) => setDuration(newValue)}
                  min={7}
                  max={90}
                  step={1}
                  marks={[
                    { value: 7, label: '7d' },
                    { value: 30, label: '30d' },
                    { value: 60, label: '60d' },
                    { value: 90, label: '90d' },
                  ]}
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleBorrow}
                  sx={{ mt: 2 }}
                >
                  Borrow Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Loan Terms */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Loan Terms
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography color="textSecondary">
                  Interest Rate (APR)
                </Typography>
                <Typography variant="h6" gutterBottom>
                  10%
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography color="textSecondary">
                  Required Collateral
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {calculateRequiredCollateral()} ETH
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography color="textSecondary">
                  Interest Amount
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {calculateInterest().toFixed(4)} ETH
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography color="textSecondary">
                  Total Repayment
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {(parseFloat(loanAmount) + calculateInterest()).toFixed(4)} ETH
                </Typography>
              </Box>

              <Alert 
                severity="info" 
                icon={<InfoIcon />}
                sx={{ mt: 2 }}
              >
                Maintain a collateral ratio above 150% to avoid liquidation
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Borrow; 