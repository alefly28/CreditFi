import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const Documentation = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Documentation
            </Typography>
            <Typography paragraph>
              Welcome to the CreditFi documentation. Here you'll find comprehensive guides and documentation to help you start working with CreditFi.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Getting Started
            </Typography>
            <Typography paragraph>
              1. Connect your wallet using MetaMask or another Web3 provider
            </Typography>
            <Typography paragraph>
              2. Get test tokens from our faucet to start experimenting with the platform
            </Typography>
            <Typography paragraph>
              3. Explore lending and borrowing features
            </Typography>
            <Typography paragraph>
              4. Build your on-chain credit score through consistent repayments
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Documentation; 