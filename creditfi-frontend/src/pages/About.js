import React from 'react';
import { Container, Typography, Box, Grid, Paper, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BarChartIcon from '@mui/icons-material/BarChart';
import Logo from '../components/Logo/Logo';

const About = () => {
  const theme = useTheme();

  const benefits = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Reduced Interest Rates',
      description: 'Users with high credit scores can access loans with up to 50% lower interest rates compared to traditional DeFi platforms'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Lower Collateral Requirements',
      description: 'Good credit score holders can borrow with as low as 110% collateral ratio, compared to the industry standard of 150%'
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Higher Borrowing Limits',
      description: 'Credit scores unlock higher borrowing capacity based on historical performance'
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Data-Driven Decisions',
      description: 'Our advanced algorithm analyzes on-chain data to create accurate risk profiles'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {/* Mission Statement */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Logo sx={{ transform: 'scale(1.5)' }} />
        </Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Revolutionizing DeFi Lending
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Introducing Credit Scores to Crypto
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto' }}>
          CreditFi bridges the gap between traditional finance and DeFi by introducing a sophisticated credit scoring system
          that enables more efficient, accessible, and secure lending in the crypto space.
        </Typography>
      </Box>

      {/* Problem Statement */}
      <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          The Problem
        </Typography>
        <Typography variant="body1" paragraph>
          Current DeFi lending platforms require high collateralization ratios (often 150% or more) due to the lack of credit assessment,
          making borrowing inefficient and capital-intensive. This over-collateralization locks up billions in excess capital
          that could be put to more productive use.
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Key Issues in Current DeFi Lending:
        </Typography>
        <ul>
          <li>High collateral requirements (150%+ ratio)</li>
          <li>No recognition of borrower creditworthiness</li>
          <li>Inefficient capital utilization</li>
          <li>Limited accessibility for new users</li>
        </ul>
      </Paper>

      {/* Our Solution */}
      <Paper elevation={3} sx={{ p: 4, mb: 8, bgcolor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Our Solution
        </Typography>
        <Typography variant="body1" paragraph>
          CreditFi introduces a revolutionary credit scoring system that analyzes on-chain data to create accurate borrower profiles.
          Our algorithm considers multiple factors:
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Credit Score Formula Components:
              </Typography>
              <ul>
                <li>Repayment History (40%)</li>
                <li>Wallet Balance History (20%)</li>
                <li>Collateral Management (15%)</li>
                <li>Transaction Volume (10%)</li>
                <li>Default Rate (10%)</li>
                <li>DeFi Experience (5%)</li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Data Sources:
              </Typography>
              <ul>
                <li>Historical lending platform interactions</li>
                <li>Wallet transaction history</li>
                <li>Smart contract interactions</li>
                <li>Cross-chain activity</li>
                <li>DeFi protocol participation</li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Benefits */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Platform Benefits
      </Typography>
      <Grid container spacing={4}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {benefit.icon}
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {benefit.title}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {benefit.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ROI Analysis */}
      <Paper elevation={3} sx={{ 
        p: 4, 
        mt: 8, 
        bgcolor: '#0A1929',
        borderRadius: 2
      }}>
        <Typography variant="h4" gutterBottom>
          Platform Economics
        </Typography>
        <Typography variant="body1" paragraph>
          Our credit scoring system creates value for all participants:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: '100%',
                bgcolor: '#132F4C',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: '#1a3f63',
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                For Lenders
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                p: 0, 
                m: 0,
                '& li': {
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '"•"',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mr: 1
                  }
                }
              }}>
                <li>Higher yields (up to 2% increase)</li>
                <li>Reduced default risk</li>
                <li>Better risk assessment</li>
                <li>Diversification options</li>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: '100%',
                bgcolor: '#132F4C',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: '#1a3f63',
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                For Borrowers
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                p: 0, 
                m: 0,
                '& li': {
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '"•"',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mr: 1
                  }
                }
              }}>
                <li>Lower interest rates (up to 50%)</li>
                <li>Reduced collateral requirements</li>
                <li>Higher borrowing limits</li>
                <li>Portable credit history</li>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: '100%',
                bgcolor: '#132F4C',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: '#1a3f63',
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Platform Growth
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                p: 0, 
                m: 0,
                '& li': {
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '"•"',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mr: 1
                  }
                }
              }}>
                <li>200% projected TVL growth</li>
                <li>50% reduced default rates</li>
                <li>3x capital efficiency</li>
                <li>Sustainable fee structure</li>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About; 