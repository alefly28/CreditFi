import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNotifications } from '../context/NotificationContext';
import LoadingOverlay from '../components/common/LoadingOverlay';
import { getContractAddress } from '../config/contracts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { account, library, chainId } = useWeb3React();
  const { error } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    creditScore: 0,
    totalBorrowed: '0',
    totalSupplied: '0',
    netApy: 0
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (account && library) {
      fetchUserData();
    }
  }, [account, library, chainId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get contract addresses
      const creditScoreAddress = getContractAddress('CreditScore', chainId);
      const lendingPoolAddress = getContractAddress('LendingPool', chainId);
      
      // Get contract instances
      const creditScoreContract = new ethers.Contract(
        creditScoreAddress,
        ['function getCreditScore(address) view returns (uint256)'],
        library
      );
      
      const lendingPoolContract = new ethers.Contract(
        lendingPoolAddress,
        [
          'function getUserBorrowBalance(address) view returns (uint256)',
          'function getUserSupplyBalance(address) view returns (uint256)',
          'function getBorrowAPY() view returns (uint256)',
          'function getSupplyAPY() view returns (uint256)'
        ],
        library
      );

      // Fetch user data
      const [
        creditScore,
        borrowBalance,
        supplyBalance,
        borrowAPY,
        supplyAPY
      ] = await Promise.all([
        creditScoreContract.getCreditScore(account),
        lendingPoolContract.getUserBorrowBalance(account),
        lendingPoolContract.getUserSupplyBalance(account),
        lendingPoolContract.getBorrowAPY(),
        lendingPoolContract.getSupplyAPY()
      ]);

      setUserStats({
        creditScore: creditScore.toNumber(),
        totalBorrowed: ethers.utils.formatEther(borrowBalance),
        totalSupplied: ethers.utils.formatEther(supplyBalance),
        netApy: (Number(supplyAPY) - Number(borrowAPY)) / 100
      });

      // For demo purposes, we'll keep the chart data static for now
      // In a real implementation, you would fetch historical data from your backend
      
    } catch (err) {
      console.error('Error fetching user data:', err);
      error('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const creditScoreData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credit Score',
        data: [650, 670, 690, 685, 700, userStats.creditScore],
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
  };

  if (!account) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              Please connect your wallet to view your dashboard
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <LoadingOverlay open={loading} message="Loading your dashboard..." />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Credit Score
                </Typography>
                <Typography variant="h4">
                  {userStats.creditScore}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userStats.creditScore / 850) * 100} 
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Borrowed
                </Typography>
                <Typography variant="h4">
                  {Number(userStats.totalBorrowed).toFixed(2)} ETH
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Supplied
                </Typography>
                <Typography variant="h4">
                  {Number(userStats.totalSupplied).toFixed(2)} ETH
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Net APY
                </Typography>
                <Typography variant="h4" color={userStats.netApy >= 0 ? "primary" : "error"}>
                  {userStats.netApy >= 0 ? "+" : ""}{userStats.netApy.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Credit Score Chart */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Line options={options} data={creditScoreData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Transactions */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Transactions
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.length > 0 ? (
                        transactions.map((tx, index) => (
                          <TableRow key={index}>
                            <TableCell>{tx.type}</TableCell>
                            <TableCell>{tx.amount} ETH</TableCell>
                            <TableCell>{tx.status}</TableCell>
                            <TableCell>{tx.date}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No transactions yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard; 