import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
  Button,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils/formatters';
import { useCreditScore } from '../../hooks/useCreditScore';

const UserProfile = () => {
  const { account, chainId } = useWeb3React();
  const { creditScore, loading } = useCreditScore();

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar 
            src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
            style={{ width: 60, height: 60, marginRight: 16 }}
          />
          <Box>
            <Typography variant="h6">
              {shortenAddress(account)}
            </Typography>
            <Typography color="textSecondary">
              Network: {chainId === 1 ? 'Mainnet' : 'Testnet'}
            </Typography>
          </Box>
        </Box>
        <Divider style={{ margin: '16px 0' }} />
        <Box>
          <Typography color="textSecondary" gutterBottom>
            Credit Score
          </Typography>
          <Typography variant="h4">
            {loading ? 'Loading...' : creditScore}
          </Typography>
        </Box>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            href={`https://etherscan.io/address/${account}`}
            target="_blank"
          >
            View on Etherscan
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile; 