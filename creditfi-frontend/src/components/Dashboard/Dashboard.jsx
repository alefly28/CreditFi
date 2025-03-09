import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import CreditScoreCard from './CreditScoreCard';
import LendingPanel from './LendingPanel';
import BorrowingPanel from './BorrowingPanel';
import StatsOverview from './StatsOverview';
import { ethers } from 'ethers';
import { CREDIT_SCORE_ABI } from '../../config/abis';

const Dashboard = () => {
  const { account, library } = useWeb3React();
  const [creditScore, setCreditScore] = useState(0);
  const [totalLent, setTotalLent] = useState('0');
  const [totalBorrowed, setTotalBorrowed] = useState('0');

  useEffect(() => {
    const fetchUserData = async () => {
      if (account && library) {
        const creditScoreContract = new ethers.Contract(
          process.env.REACT_APP_CREDIT_SCORE_ADDRESS,
          CREDIT_SCORE_ABI,
          library.getSigner()
        );

        try {
          const score = await creditScoreContract.getCreditScore(account);
          setCreditScore(score.toNumber());
          
          // Fetch lending and borrowing data
          const lendingContract = new ethers.Contract(
            process.env.REACT_APP_LENDING_POOL_ADDRESS,
            LENDING_POOL_ABI,
            library.getSigner()
          );
          
          const [lentAmount, borrowedAmount] = await Promise.all([
            lendingContract.getUserTotalLent(account),
            lendingContract.getUserTotalBorrowed(account)
          ]);
          
          setTotalLent(ethers.utils.formatEther(lentAmount));
          setTotalBorrowed(ethers.utils.formatEther(borrowedAmount));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [account, library]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Overview */}
        <Grid item xs={12}>
          <StatsOverview 
            creditScore={creditScore}
            totalLent={totalLent}
            totalBorrowed={totalBorrowed}
          />
        </Grid>

        {/* Credit Score Card */}
        <Grid item xs={12} md={4}>
          <CreditScoreCard score={creditScore} />
        </Grid>

        {/* Lending Panel */}
        <Grid item xs={12} md={4}>
          <LendingPanel totalLent={totalLent} />
        </Grid>

        {/* Borrowing Panel */}
        <Grid item xs={12} md={4}>
          <BorrowingPanel 
            totalBorrowed={totalBorrowed}
            creditScore={creditScore}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 