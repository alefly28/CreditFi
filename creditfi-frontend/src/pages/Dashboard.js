import React from 'react';
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
  Paper
} from '@mui/material';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ userStats = {}, recentTransactions = [] }) => {
  const creditScoreData = {
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
  };

  return (
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
                720
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={85} 
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
                2.5 ETH
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
                5.0 ETH
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
              <Typography variant="h4" color="primary">
                +4.2%
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
                    <TableRow>
                      <TableCell>Borrow</TableCell>
                      <TableCell>1.5 ETH</TableCell>
                      <TableCell>Completed</TableCell>
                      <TableCell>2024-01-12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Supply</TableCell>
                      <TableCell>2.0 ETH</TableCell>
                      <TableCell>Completed</TableCell>
                      <TableCell>2024-01-10</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Repay</TableCell>
                      <TableCell>0.5 ETH</TableCell>
                      <TableCell>Completed</TableCell>
                      <TableCell>2024-01-08</TableCell>
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

export default Dashboard; 