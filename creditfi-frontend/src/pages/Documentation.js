import React from 'react';
import { Container, Typography, Box, Paper, Tabs, Tab, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SecurityIcon from '@mui/icons-material/Security';
import CalculateIcon from '@mui/icons-material/Calculate';
import Logo from '../components/Logo/Logo';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const Documentation = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Logo sx={{ transform: 'scale(1.2)' }} />
        </Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Documentation
        </Typography>
      </Box>

      <Paper elevation={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<MenuBookIcon />} label="Getting Started" />
          <Tab icon={<CodeIcon />} label="Technical Details" />
          <Tab icon={<CalculateIcon />} label="Credit Score" />
          <Tab icon={<SecurityIcon />} label="Security" />
        </Tabs>

        {/* Getting Started */}
        <TabPanel value={value} index={0}>
          <Typography variant="h5" gutterBottom>
            Getting Started with CreditFi
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Prerequisites
            </Typography>
            <ul>
              <li>EVM wallet installed</li>
              <li>Some Sepolia testnet ETH (available from faucets)</li>
              <li>Basic understanding of DeFi lending & borrowing</li>
            </ul>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Quick Start Guide
            </Typography>
            <ol>
              <li>Connect your wallet using the "Connect Wallet" button</li>
              <li>Navigate to the Credit Score page to view your initial score</li>
              <li>Start with lending to build your credit history</li>
              <li>Once you have a credit score, explore borrowing options</li>
            </ol>
          </Box>
        </TabPanel>

        {/* Technical Details */}
        <TabPanel value={value} index={1}>
          <Typography variant="h5" gutterBottom>
            Technical Documentation
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Smart Contracts
            </Typography>
            <Typography variant="body1" paragraph>
              CreditFi is built on three main smart contracts:
            </Typography>
            <ul>
              <li><strong>CreditScore.sol:</strong> Manages credit score calculation and updates</li>
              <li><strong>LendingPool.sol:</strong> Handles lending and borrowing operations</li>
              <li><strong>LendingRewards.sol:</strong> Manages incentives and rewards</li>
            </ul>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Integration Guide
            </Typography>
            <Typography variant="body1">
              To integrate with CreditFi, use our Web3 library and smart contract ABIs:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: theme.palette.grey[100], my: 2 }}>
              <pre style={{ margin: 0, overflow: 'auto' }}>
{`// Example integration code
const creditScore = await CreditScore.attach(CONTRACT_ADDRESS);
const score = await creditScore.getUserScore(userAddress);`}
              </pre>
            </Paper>
          </Box>
        </TabPanel>

        {/* Credit Score */}
        <TabPanel value={value} index={2}>
          <Typography variant="h5" gutterBottom>
            Credit Score Calculation
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Score Components
            </Typography>
            <Typography variant="body1" paragraph>
              The credit score (0-850) is calculated using the following formula:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: theme.palette.grey[100], my: 2 }}>
              <pre style={{ margin: 0, overflow: 'auto' }}>
{`Score = (RepaymentHistory * 0.4) +
       (WalletBalance * 0.2) +
       (CollateralMgmt * 0.15) +
       (TxVolume * 0.1) +
       (DefaultRate * 0.1) +
       (DefiExp * 0.05)`}
              </pre>
            </Paper>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Score Improvement Tips
            </Typography>
            <ul>
              <li>Maintain consistent lending activity</li>
              <li>Repay loans on time</li>
              <li>Keep healthy collateral ratios</li>
              <li>Avoid liquidations</li>
              <li>Participate in multiple DeFi protocols</li>
            </ul>
          </Box>
        </TabPanel>

        {/* Security */}
        <TabPanel value={value} index={3}>
          <Typography variant="h5" gutterBottom>
            Security Features
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Smart Contract Security
            </Typography>
            <ul>
              <li>Open-source and verified on Etherscan</li>
              <li>Regular security updates and improvements</li>
            </ul>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Risk Management
            </Typography>
            <ul>
              <li>Automatic liquidation mechanisms</li>
              <li>Price oracle redundancy</li>
              <li>Emergency pause functionality</li>
              <li>Gradual parameter updates</li>
            </ul>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Best Practices
            </Typography>
            <ul>
              <li>Never share private keys</li>
              <li>Verify contract addresses</li>
              <li>Start with small amounts</li>
              <li>Monitor your positions regularly</li>
            </ul>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Documentation; 