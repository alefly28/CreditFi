import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, useTheme, Paper, Fade, Slide, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ShieldIcon from '@mui/icons-material/Shield';
import GroupsIcon from '@mui/icons-material/Groups';
import CodeIcon from '@mui/icons-material/Code';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <SwapHorizIcon sx={{ fontSize: 40 }} />,
      title: 'Supply & Borrow',
      description: 'Supply assets to earn interest and borrow with lower collateral requirements.'
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: 'Credit Score',
      description: 'Build your on-chain credit score through consistent borrowing and repayment.'
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40 }} />,
      title: 'Non-Custodial',
      description: 'Maintain full control of your assets throughout the lending process.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Community Governed',
      description: 'Protocol decisions are made by CRFI token holders through transparent governance.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Audited',
      description: 'Multiple security audits and formal verification ensure protocol safety.'
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Composable',
      description: 'Built for integration with other DeFi protocols and applications.'
    }
  ];

  const stats = [
    { value: '5.2M', label: 'TOTAL VALUE LOCKED', prefix: '$' },
    { value: '12.5K', label: 'ACTIVE USERS' },
    { value: '110', label: 'MIN COLLATERAL RATIO', suffix: '%' },
    { value: '850', label: 'AVG LOAN SIZE', prefix: '$' }
  ];

  const fundamentals = [
    {
      title: 'The Problem',
      content: 'Traditional DeFi lending requires excessive collateral (150%+), locking billions in capital. This inefficiency stems from the lack of credit assessment in the crypto space, making borrowing expensive and capital-intensive.',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'Our Solution',
      content: 'CreditFi introduces on-chain credit scoring, enabling collateral requirements as low as 110% for qualified borrowers. Our protocol analyzes on-chain behavior, transaction history, and DeFi interactions to establish creditworthiness.',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'Mission',
      content: 'To democratize DeFi lending by creating a fair, transparent, and efficient credit system that works for everyone, bridging the gap between traditional finance and DeFi.',
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'Vision',
      content: 'To become the standard for decentralized credit scoring in Web3, enabling a future where credit history is portable, transparent, and controlled by users, not institutions.',
      icon: <TimelineIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'Uniqueness',
      content: 'Our proprietary credit scoring algorithm combines multiple on-chain metrics with ML models to assess creditworthiness. We\'re the first protocol to offer dynamic collateral requirements based on credit scores.',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />
    },
    {
      title: 'Token Economics',
      content: 'CRFI token will have a fixed supply of $100M tokens with no possible minting of new tokens. This is the most important part as we want the tokenomics to favour buyers by being deflationary and also with a revenue share percentage through various programs. The rest is yet to be defined.',
      icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />
    }
  ];

  const revenueStreams = [
    {
      title: 'Protocol Fees',
      content: '0.1% fee on all loans and 1% fee on liquidations, ensuring sustainable protocol growth while maintaining competitive rates.',
      percentage: '60%'
    },
    {
      title: 'Credit Score API',
      content: 'Enterprise API access for other DeFi protocols to integrate CreditFi\'s credit scoring system.',
      percentage: '25%'
    },
    {
      title: 'Premium Features',
      content: 'Advanced analytics, credit monitoring, and preferential rates for CRFI stakers.',
      percentage: '15%'
    }
  ];

  const howItWorks = [
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: "Connect & Build Credit",
      description: "Connect your wallet and start building your on-chain credit score through DeFi interactions."
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
      title: "Supply or Borrow",
      description: "Supply assets to earn interest or borrow with lower collateral requirements based on your credit score."
    },
    {
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />,
      title: "Improve Your Score",
      description: "Maintain good borrowing habits and repayment history to improve your credit score over time."
    }
  ];

  const roadmap = [
    {
      quarter: "Phase 1",
      title: "Foundation",
      items: [
        "Protocol Launch",
        "Core Partnerships",
        "Credit Score System Beta"
      ]
    },
    {
      quarter: "Phase 2",
      title: "Expansion",
      items: [
        "Multi-chain Integration",
        "Advanced Analytics Platform",
        "Institutional Onboarding"
      ]
    },
    {
      quarter: "Phase 3",
      title: "Ecosystem Growth",
      items: [
        "Token Launch",
        "DAO Governance",
        "Extended Market Coverage"
      ]
    }
  ];

  const supportOptions = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: "General Inquiries",
      description: "Questions about our protocol or services? Reach out to our team.",
      email: "automateaisolutions@mail.com"
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: "Partnership Opportunities",
      description: "Interested in partnering with CreditFi? Let's discuss collaboration possibilities.",
      email: "automateaisolutions@mail.com"
    },
    {
      icon: <HelpOutlineIcon sx={{ fontSize: 40 }} />,
      title: "Technical Support",
      description: "Need help with integration or technical questions? Our dev team is here to help.",
      email: "automateaisolutions@mail.com"
    }
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: { xs: 'calc(100vh - 56px)', sm: '90vh' },
        pt: { xs: 4, sm: 0 },
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(0,109,119,0.05) 0%, rgba(0,109,119,0) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, ${theme.palette.primary.main}08 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${theme.palette.secondary.main}08 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${theme.palette.primary.light}05 0%, transparent 70%)
          `,
        }
      }}>
        {/* Animated background elements */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(window.innerWidth > 600 ? 5 : 3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.2, 0.8],
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0]
              }}
              transition={{ 
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                left: `${20 + i * 15}%`,
                top: `${20 + i * 12}%`,
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `radial-gradient(circle at center, ${theme.palette.primary.main}10, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Typography 
                  component="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '4.5rem' },
                    lineHeight: { xs: 1.3, md: 1.2 },
                    fontWeight: 800,
                    mb: { xs: 2, md: 3 },
                    px: { xs: 2, sm: 0 },
                    textAlign: { xs: 'center', md: 'left' },
                    background: `linear-gradient(45deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.secondary.main}, 
                      ${theme.palette.primary.light}
                    )`,
                    backgroundSize: '200% 200%',
                    animation: 'gradient 8s ease infinite',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  The Future of <br />DeFi Lending
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary"
                  sx={{ 
                    mb: { xs: 3, md: 4 }, 
                    maxWidth: 600,
                    fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.6,
                    opacity: 0.9,
                    px: { xs: 2, sm: 0 },
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  CreditFi revolutionizes DeFi lending with on-chain credit scoring, reducing collateral requirements by up to 40% while maintaining protocol safety.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 2, md: 3 }, 
                  flexWrap: 'wrap',
                  mb: { xs: 4, md: 0 },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.8, md: 1.8 },
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: '12px',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      boxShadow: `0 8px 16px ${theme.palette.primary.main}30`,
                      position: 'relative',
                      overflow: 'hidden',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      '&:active': {
                        transform: 'scale(0.98)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(
                          90deg,
                          transparent,
                          rgba(255,255,255,0.2),
                          transparent
                        )`,
                        transition: 'all 0.5s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 20px ${theme.palette.primary.main}40`,
                        '&::before': {
                          left: '100%',
                        }
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    Launch App
                  </Button>
                  <Button
                    component={Link}
                    to="/docs"
                    variant="outlined"
                    size="large"
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.8, md: 1.8 },
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: '12px',
                      borderWidth: '2px',
                      backdropFilter: 'blur(10px)',
                      background: 'rgba(255,255,255,0.01)',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      '&:active': {
                        transform: 'scale(0.98)',
                      },
                      '&:hover': {
                        borderWidth: '2px',
                        background: 'rgba(255,255,255,0.05)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    Documentation
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative' }}>
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 2, sm: 2, md: 3 },
                            textAlign: 'center',
                            background: 'rgba(255,255,255,0.02)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'rgba(255,255,255,0.1)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent',
                            '&:active': {
                              transform: 'scale(0.98)',
                            },
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(135deg, 
                                ${theme.palette.primary.main}10, 
                                ${theme.palette.secondary.main}10
                              )`,
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            },
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              borderColor: theme.palette.primary.main,
                              '&::before': {
                                opacity: 1,
                              }
                            }
                          }}
                        >
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              fontWeight: 700,
                              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
                              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              mb: 1
                            }}
                          >
                            {stat.prefix}
                            <CountUp 
                              end={parseFloat(stat.value)} 
                              duration={2.5} 
                              decimals={stat.value.includes('.') ? 1 : 0}
                              separator=","
                            />
                            {stat.suffix}
                          </Typography>
                          <Typography 
                            variant="caption"
                            sx={{ 
                              opacity: 0.8,
                              letterSpacing: '1px',
                              fontWeight: 500,
                              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' }
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </Paper>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 16 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: { xs: 1, md: 2 },
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              px: { xs: 2, sm: 0 },
              background: `linear-gradient(45deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main}, 
                ${theme.palette.primary.light}
              )`,
              backgroundSize: '200% 200%',
              animation: 'gradient 8s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DeFi lending, reimagined
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary"
            sx={{ 
              mb: { xs: 4, md: 8 }, 
              maxWidth: 700, 
              mx: 'auto',
              opacity: 0.9,
              px: { xs: 2, sm: 0 },
              fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            Experience the next generation of DeFi lending with our innovative credit scoring system
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: { xs: 3, md: 4 },
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    '&:active': {
                      transform: 'scale(0.98)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, 
                        ${theme.palette.primary.main}08, 
                        ${theme.palette.secondary.main}08
                      )`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: theme.palette.primary.main,
                      '&::before': {
                        opacity: 1,
                      },
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: theme.palette.primary.main,
                      }
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 2.5, sm: 3, md: 4 },
                    '&:last-child': { pb: { xs: 2.5, sm: 3, md: 4 } }
                  }}>
                    <Box 
                      className="feature-icon"
                      sx={{ 
                        color: theme.palette.text.secondary,
                        transition: 'all 0.3s ease',
                        mb: { xs: 1.5, md: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: 48, md: 60 },
                        height: { xs: 48, md: 60 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}10, 
                          ${theme.palette.secondary.main}10
                        )`,
                      }}
                    >
                      {React.cloneElement(feature.icon, { 
                        sx: { fontSize: { xs: 28, md: 40 } }
                      })}
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                        mb: { xs: 0.5, md: 1 }
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        opacity: 0.9,
                        lineHeight: { xs: 1.4, md: 1.6 }
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Documentation Section */}
      <Box sx={{ 
        bgcolor: 'background.default', 
        py: { xs: 8, md: 12 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 30%, ${theme.palette.primary.main}05 0%, transparent 70%),
                      radial-gradient(circle at 80% 70%, ${theme.palette.secondary.main}05 0%, transparent 70%)`,
          pointerEvents: 'none'
        }
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: { xs: 1, md: 2 },
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main}, 
                  ${theme.palette.primary.light}
                )`,
                backgroundSize: '200% 200%',
                animation: 'gradient 8s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CreditFi Fundamentals
            </Typography>
            <Typography 
              variant="h5" 
              align="center" 
              color="text.secondary"
              sx={{ 
                mb: { xs: 6, md: 8 }, 
                maxWidth: 800, 
                mx: 'auto',
                opacity: 0.9
              }}
            >
              Understanding our protocol's core principles and value proposition
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {fundamentals.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.02)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'rgba(255,255,255,0.1)',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}08, 
                          ${theme.palette.secondary.main}08
                        )`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: theme.palette.primary.main,
                        '&::before': {
                          opacity: 1,
                        },
                        '& .icon-wrapper': {
                          transform: 'scale(1.1) rotate(5deg)',
                          color: theme.palette.primary.main,
                        }
                      }
                    }}
                  >
                    <Box 
                      className="icon-wrapper"
                      sx={{ 
                        color: theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}10, 
                          ${theme.palette.secondary.main}10
                        )`,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        lineHeight: 1.7,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        opacity: 0.9
                      }}
                    >
                      {item.content}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Revenue Model Section */}
          <Box sx={{ mt: 12 }}>
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 8,
                fontWeight: 800
              }}
            >
              Revenue Streams
            </Typography>
            <Grid container spacing={4}>
              {revenueStreams.map((stream, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Paper
                      sx={{
                        p: 4,
                        height: '100%',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        }
                      }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 700,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stream.percentage}
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {stream.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stream.content}
                      </Typography>
                    </Paper>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Company Culture Section */}
          <Box sx={{ mt: 12 }}>
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 8,
                fontWeight: 800
              }}
            >
              Our Culture
            </Typography>
            <Paper
              sx={{
                p: 6,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
                    Innovation First
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    We're pioneers in DeFi, constantly pushing boundaries to create better financial solutions. Our team thrives on solving complex challenges with innovative approaches.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
                    Transparency & Trust
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    Our code is open-source, our metrics are public, and our decisions are community-driven. We believe in building trust through complete transparency.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
                    User-Centric
                  </Typography>
                  <Typography variant="body1">
                    Every feature and decision is made with our users' best interests in mind. We're committed to creating products that genuinely improve the DeFi experience.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* How it Works Section */}
          <Box sx={{ mt: 16, mb: 16 }}>
            <Container maxWidth="lg">
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: 8,
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                How it Works
              </Typography>
              <Grid container spacing={4}>
                {howItWorks.map((step, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          height: '100%',
                          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                          borderRadius: 4,
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                          }
                        }}
                      >
                        <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                          {step.icon}
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Roadmap Section */}
          <Box sx={{ py: 16, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: 8,
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Roadmap
              </Typography>
              <Grid container spacing={4}>
                {roadmap.map((phase, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          height: '100%',
                          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                          borderRadius: 4,
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '4px',
                            height: '100%',
                            background: theme.palette.primary.main,
                          }
                        }}
                      >
                        <Typography 
                          variant="overline" 
                          sx={{ 
                            color: theme.palette.primary.main,
                            fontWeight: 600 
                          }}
                        >
                          {phase.quarter}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 1 }}>
                          {phase.title}
                        </Typography>
                        <List>
                          {phase.items.map((item, itemIndex) => (
                            <ListItem key={itemIndex} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                                  viewport={{ once: true }}
                                >
                                  <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />
                                </motion.div>
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Support Section */}
          <Box sx={{ py: 16, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: 2,
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Get in Touch
              </Typography>
              <Typography 
                variant="h6" 
                align="center" 
                color="text.secondary"
                sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
              >
                Have questions or want to collaborate? We're here to help you succeed in the DeFi space.
              </Typography>
              <Grid container spacing={4}>
                {supportOptions.map((option, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          height: '100%',
                          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
                          borderRadius: 4,
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease-in-out',
                          border: '1px solid',
                          borderColor: 'transparent',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            borderColor: theme.palette.primary.main,
                            '& .support-icon': {
                              transform: 'scale(1.1)',
                              color: theme.palette.primary.main,
                            }
                          }
                        }}
                      >
                        <Box 
                          className="support-icon"
                          sx={{ 
                            mb: 3,
                            color: theme.palette.text.secondary,
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          {option.icon}
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          {option.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          {option.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          component="a"
                          href={`mailto:${option.email}`}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': {
                              background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                            }
                          }}
                        >
                          Contact Us
                        </Button>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Visual Enhancement: Add a floating gradient orb in the background */}
          <Box
            sx={{
              position: 'fixed',
              top: '20%',
              left: '10%',
              width: '40vw',
              height: '40vw',
              borderRadius: '50%',
              background: `radial-gradient(circle at center, ${theme.palette.primary.main}10, transparent 70%)`,
              filter: 'blur(60px)',
              zIndex: -1,
              animation: 'float 20s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '50%': { transform: 'translate(5%, 5%)' },
              }
            }}
          />

          {/* Add subtle grid pattern overlay */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(${theme.palette.background.default}20 1px, transparent 1px),
                               linear-gradient(90deg, ${theme.palette.background.default}20 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              opacity: 0.1,
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 