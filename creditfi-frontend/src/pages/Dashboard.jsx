import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import FaucetButton from '../components/Faucet/FaucetButton';

const Dashboard = () => {
  const { account } = useWeb3React();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            {!account ? (
              <Typography>Please connect your wallet to view your dashboard</Typography>
            ) : (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Connected Wallet: {account}
                  </Typography>
                  <FaucetButton />
                </Box>
                {/* Add more dashboard content here */}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 