import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const Lend = () => {
  const { account } = useWeb3React();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Lend
            </Typography>
            {!account ? (
              <Typography>Please connect your wallet to access lending features</Typography>
            ) : (
              <Typography>Lending features coming soon...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Lend; 