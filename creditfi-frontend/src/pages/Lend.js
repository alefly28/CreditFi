import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Lend = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSupply = async () => {
    setLoading(true);
    try {
      // Implement supply logic here
      console.log('Supplying:', amount, 'ETH');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating transaction
    } catch (error) {
      console.error('Supply failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const poolStats = {
    totalSupplied: '1,234.56 ETH',
    utilizationRate: '75%',
    supplyAPY: '4.5%',
    totalSuppliers: '156',
  };

  const recentSupplies = [
    { address: '0x1234...5678', amount: '10.5 ETH', timestamp: '2024-01-12 10:30' },
    { address: '0x8765...4321', amount: '5.2 ETH', timestamp: '2024-01-12 10:15' },
    { address: '0x9876...5432', amount: '15.0 ETH', timestamp: '2024-01-12 10:00' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Supply Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Supply Assets
              </Typography>
              <Typography color="textSecondary" paragraph>
                Earn interest by supplying assets to the lending pool
              </Typography>

              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Amount (ETH)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSupply}
                  disabled={loading || !amount}
                  startIcon={loading ? <CircularProgress size={20} /> : <AccountBalanceIcon />}
                >
                  {loading ? 'Supplying...' : 'Supply ETH'}
                </Button>

                <Alert severity="info" sx={{ mt: 2 }}>
                  You will receive cTokens as proof of your deposit
                </Alert>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pool Stats */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pool Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Total Supplied</Typography>
                  <Typography variant="h6">{poolStats.totalSupplied}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Utilization Rate</Typography>
                  <Typography variant="h6">{poolStats.utilizationRate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Supply APY</Typography>
                  <Typography variant="h6" color="primary">
                    {poolStats.supplyAPY}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Total Suppliers</Typography>
                  <Typography variant="h6">{poolStats.totalSuppliers}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Supplies
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentSupplies.map((supply, index) => (
                      <TableRow key={index}>
                        <TableCell>{supply.address}</TableCell>
                        <TableCell>{supply.amount}</TableCell>
                        <TableCell>{supply.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* User's Supplies */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Supplies
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset</TableCell>
                      <TableCell>Supplied</TableCell>
                      <TableCell>APY</TableCell>
                      <TableCell>Collateral</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>ETH</TableCell>
                      <TableCell>5.0 ETH</TableCell>
                      <TableCell>4.5%</TableCell>
                      <TableCell>Yes</TableCell>
                      <TableCell>
                        <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                          Withdraw
                        </Button>
                        <Button variant="outlined" size="small" color="secondary">
                          Disable Collateral
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Lend; 